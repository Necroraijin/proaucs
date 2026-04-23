"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuctionForm } from "@/components/auction-form"

export default function CreateAuctionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          <AuctionForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
