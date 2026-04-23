"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getAuction, placeBid, getParticipantStatus, Auction, Participant } from "@/lib/services"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { formatCurrency, formatTimeLeft } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, ShieldCheck, User, Gavel, Heart, Share2, Lock, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { motion } from "motion/react"

export default function AuctionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { user } = useAuth()
  
  const [auction, setAuction] = useState<Auction | null>(null)
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [bidAmount, setBidAmount] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data = await getAuction(id)
        if (data) {
          setAuction(data)
          setBidAmount(data.currentBid + 10)
          
          if (user) {
            const pStatus = await getParticipantStatus(id, user.id)
            setParticipant(pStatus)
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuction()
  }, [id, user])

  // Real-time listener via Supabase
  useEffect(() => {
    if (!auction) return;
    
    const channel = supabase
      .channel(`auction-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'auctions',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          const updatedAuction = payload.new as Auction;
          setAuction(updatedAuction);
          // Only automatically update bid amount if user hasn't typed a higher value manually
          setBidAmount((current) => Math.max(current, updatedAuction.currentBid + 10));
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [auction?.id, id])

  // Timer effect could go here (e.g. updating `timeLeft` based on `auction.endTime`)

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>

  if (!auction) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Auction Not Found</h1>
        <Button className="mt-4" asChild>
          <Link href="/browse">Back to Browse</Link>
        </Button>
      </div>
    )
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please login to place a bid")
      router.push("/login")
      return
    }
    
    if (!participant || participant.status !== 'approved') {
      toast.error("You must pay EMD and be approved to bid")
      return
    }

    if (!auction) return

    if (bidAmount <= auction.currentBid) {
      toast.error("Bid must be higher than current bid")
      return
    }
    
    try {
      await placeBid(auction.id, user.id, bidAmount)
      toast.success("Bid placed successfully!")
    } catch (error) {
      toast.error("Failed to place bid")
    }
  }

  const renderBidSection = () => {
    if (!user) {
      return (
        <Button className="w-full h-12 text-lg" asChild>
          <Link href="/login">Login to Bid</Link>
        </Button>
      )
    }

    if (!auction) return null

    if (!participant) {
      return (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-yellow-800">
            <Lock className="h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Participation Locked</p>
              <p>You must pay an Earnest Money Deposit (EMD) of {formatCurrency(auction.emdAmount)} to participate in this auction.</p>
            </div>
          </div>
          <Button className="w-full h-12 text-lg" asChild>
            <Link href={`/auctions/${id}/pay-emd`}>Pay EMD to Unlock</Link>
          </Button>
        </div>
      )
    }

    if (participant.status === 'pending') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-blue-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Verification Pending</p>
            <p>We have received your EMD payment details. Please wait for admin approval to start bidding.</p>
          </div>
        </div>
      )
    }

    if (participant.status === 'rejected') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Request Rejected</p>
            <p>Your participation request was rejected. Please contact support.</p>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleBid} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input 
              type="number" 
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="h-12 text-lg"
              min={auction.currentBid + 1}
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8">
            Place Bid
          </Button>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Minimum bid: {formatCurrency(auction.currentBid + 1)}</span>
          <span>Starting bid: {formatCurrency(auction.startingBid)}</span>
        </div>
      </form>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border shadow-sm"
            >
              <Image 
                src={auction.imageUrl} 
                alt={auction.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Auction Details */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="flex justify-between items-start">
                <Badge className="mb-2">{auction.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{auction.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Ends in {timeLeft}</span>
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {auction.bids} bids</span>
              </div>
            </div>

            <Card className="border-primary/20 shadow-md bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Bid</CardTitle>
                <div className="text-4xl font-bold text-primary">{formatCurrency(auction.currentBid)}</div>
              </CardHeader>
              <CardContent>
                {renderBidSection()}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {auction.description}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
