"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuctionForm } from "@/components/auction-form"
import { getAuction, Auction } from "@/lib/services"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function EditAuctionPage() {
  const params = useParams()
  const id = params.id as string
  const [auction, setAuction] = useState<Auction | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>

  if (!auction) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
          <Button asChild>
            <Link href="/admin">Back to Admin</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          <AuctionForm initialData={auction} isEditing />
        </div>
      </main>
      <Footer />
    </div>
  )
}
