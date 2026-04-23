"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-12 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Frequently Asked Questions</h1>
        
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does bidding work?</AccordionTrigger>
                <AccordionContent>
                  Bidding is simple. Once you find an item you like, place a bid higher than the current price. If someone outbids you, we&apos;ll notify you so you can bid again. The highest bidder when the timer runs out wins the item.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use industry-standard encryption and secure payment gateways to ensure your financial information is always protected. We never store your full credit card details on our servers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What happens if I win an auction?</AccordionTrigger>
                <AccordionContent>
                  If you win, you&apos;ll receive a notification and an email with instructions to complete your purchase. You&apos;ll have 48 hours to finalize payment and arrange shipping details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I cancel a bid?</AccordionTrigger>
                <AccordionContent>
                  Generally, bids are binding contracts and cannot be retracted. However, in exceptional circumstances (like an obvious typo in bid amount), you can contact support within 1 hour of placing the bid.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How are shipping costs calculated?</AccordionTrigger>
                <AccordionContent>
                  Shipping costs vary by item size, weight, and destination. The estimated shipping cost is displayed on the auction detail page.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
