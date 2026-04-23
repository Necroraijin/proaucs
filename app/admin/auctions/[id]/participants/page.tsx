"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAuction, getAuctionParticipants, updateParticipantStatus, Auction, Participant } from "@/lib/services"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, Check, X } from "lucide-react"

export default function ManageParticipantsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [auction, setAuction] = useState<Auction | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionData = await getAuction(id)
        setAuction(auctionData)
        
        if (auctionData) {
          const participantsData = await getAuctionParticipants(id)
          setParticipants(participantsData)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleStatusUpdate = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      await updateParticipantStatus(id, userId, status)
      setParticipants(prev => prev.map(p => 
        p.userId === userId ? { ...p, status } : p
      ))
      toast.success(`User ${status} successfully`)
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (!auction) return <div>Auction not found</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
        </Button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manage Participants</h1>
            <p className="text-muted-foreground">Auction: {auction.title}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">EMD Amount</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(auction.emdAmount)}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Participant Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {participants.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No participation requests yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead>Payment Ref</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow key={participant.userId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{participant.userName || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{participant.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(participant.requestedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="font-mono text-xs">{participant.paymentReference}</TableCell>
                      <TableCell>
                        <Badge variant={
                          participant.status === 'approved' ? 'default' : 
                          participant.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {participant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {participant.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-600" onClick={() => handleStatusUpdate(participant.userId, 'approved')}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600" onClick={() => handleStatusUpdate(participant.userId, 'rejected')}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
