"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose prose-green max-w-none dark:prose-invert">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, place a bid, or contact customer support.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use your information to facilitate auctions, process payments, and improve our platform services.</p>
          
          <h3>3. Information Sharing</h3>
          <p>We do not sell your personal information. We may share information with third-party service providers who help us operate our business.</p>
          
          <h3>4. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>
          
          <h3>5. Your Rights</h3>
          <p>You have the right to access, correct, or delete your personal information at any time through your account settings.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
