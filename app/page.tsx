"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Clock, TrendingUp, ShieldCheck } from "lucide-react"
import { MOCK_AUCTIONS } from "@/lib/data"
import { formatCurrency, formatTimeLeft } from "@/lib/utils"
import Image from "next/image"
import { motion } from "motion/react"

export default function Home() {
  const featuredAuctions = MOCK_AUCTIONS.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/30 py-20 md:py-32">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="secondary">Live Real-time Auctions</Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Discover Unique Items <br className="hidden sm:inline" />
                <span className="text-primary">Bid & Win Instantly</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Join the world&apos;s most trusted auction marketplace. From vintage collectibles to modern tech, find what you love and bid with confidence.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/browse">Start Bidding <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { icon: Clock, title: "Real-Time Bidding", desc: "Experience the thrill of live auctions with instant updates and zero latency." },
                { icon: ShieldCheck, title: "Secure Payments", desc: "Your transactions are protected with industry-standard encryption and escrow." },
                { icon: TrendingUp, title: "Smart Analytics", desc: "Track your bids, wins, and spending with our comprehensive user dashboard." }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Auctions */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Featured Auctions</h2>
              <Button variant="ghost" asChild>
                <Link href="/browse">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredAuctions.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <Image 
                        src={auction.imageUrl} 
                        alt={auction.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/70 hover:bg-black/80 backdrop-blur-sm">
                          {formatTimeLeft(new Date(auction.endTime))} left
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{auction.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-1 text-lg">{auction.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Bid</p>
                          <p className="text-xl font-bold text-primary">{formatCurrency(auction.currentBid)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{auction.bids} bids</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <Link href={`/auctions/${auction.id}`}>Place Bid</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Bidding?</h2>
                <p className="text-primary-foreground/80 text-lg">
                  Join thousands of users finding amazing deals every day. Sign up now and get your first bid free.
                </p>
                <Button size="lg" variant="secondary" className="mt-4" asChild>
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
