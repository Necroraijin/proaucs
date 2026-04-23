"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose prose-green max-w-none dark:prose-invert">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using Proaucs, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h3>2. User Accounts</h3>
          <p>To participate in auctions, you must create an account. You are responsible for maintaining the confidentiality of your account and password.</p>
          
          <h3>3. Bidding Rules</h3>
          <p>All bids are binding contracts. If you are the highest bidder when an auction closes, you are obligated to purchase the item.</p>
          
          <h3>4. Fees and Payments</h3>
          <p>We charge a buyer&apos;s premium on all won auctions. Payment must be made within 48 hours of auction end.</p>
          
          <h3>5. Prohibited Items</h3>
          <p>The sale of illegal, stolen, or counterfeit items is strictly prohibited on Proaucs.</p>
          
          <h3>6. Limitation of Liability</h3>
          <p>Proaucs is not responsible for the quality, safety, or legality of items listed by sellers.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
