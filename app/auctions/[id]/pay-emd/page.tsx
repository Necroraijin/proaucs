"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAuction, submitEmdPayment, Auction } from "@/lib/services"
import { useAuth } from "@/components/auth-provider"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, CheckCircle2, Copy } from "lucide-react"

export default function PayEMDPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { user } = useAuth()
  
  const [auction, setAuction] = useState<Auction | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [paymentRef, setPaymentRef] = useState("")

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const data = await getAuction(id)
        setAuction(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAuction()
  }, [id])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !auction) return
    
    setSubmitting(true)
    try {
      await submitEmdPayment(auction.id, user.uid, paymentRef, {
        name: user.displayName || "Unknown",
        email: user.email || "Unknown"
      })
      toast.success("Payment details submitted! Waiting for admin approval.")
      router.push(`/auctions/${auction.id}`)
    } catch (error) {
      toast.error("Failed to submit payment details")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (!auction) return <div>Auction not found</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Auction
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Pay Earnest Money Deposit (EMD)</CardTitle>
              <CardDescription>
                To participate in the auction for <span className="font-semibold text-foreground">{auction.title}</span>, 
                you must deposit an EMD amount of <span className="font-semibold text-primary">{formatCurrency(auction.emdAmount)}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Company Bank Details
                </h3>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between items-center p-2 bg-background rounded border">
                    <div>
                      <p className="text-muted-foreground">Account Name</p>
                      <p className="font-medium">Proaucs Technologies Pvt Ltd</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy("Proaucs Technologies Pvt Ltd")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded border">
                    <div>
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-medium">123456789012</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy("123456789012")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded border">
                    <div>
                      <p className="text-muted-foreground">IFSC Code</p>
                      <p className="font-medium">HDFC0001234</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy("HDFC0001234")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded border">
                    <div>
                      <p className="text-muted-foreground">UPI ID</p>
                      <p className="font-medium">proaucs@hdfcbank</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy("proaucs@hdfcbank")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ref">Payment Reference / Transaction ID</Label>
                  <Input 
                    id="ref" 
                    placeholder="Enter transaction ID (e.g. UPI Ref No, UTR)" 
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Please enter the reference number from your payment confirmation.
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Payment Details"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/20 text-xs text-muted-foreground">
              Note: Your participation request will be reviewed by our admin team. Once approved, you will be able to place bids on this auction. The EMD is refundable if you do not win the auction.
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
