"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_AUCTIONS } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Gavel, Clock, CreditCard, User, Settings, LogOut } from "lucide-react"
import { motion } from "motion/react"

export default function DashboardPage() {
  const activeBids = MOCK_AUCTIONS.slice(0, 2)
  const wonAuctions = MOCK_AUCTIONS.slice(2, 3)
  const watchlist = MOCK_AUCTIONS.slice(3, 5)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your bids, watchlist, and account settings.</p>
          </div>
          <Button variant="outline" className="text-destructive hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue="bids" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="bids">Active Bids</TabsTrigger>
            <TabsTrigger value="won">Won Auctions</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bids" className="space-y-4">
            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
            >
              {activeBids.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">
                        <Link href={`/auctions/${auction.id}`} className="hover:underline">
                          {auction.title}
                        </Link>
                      </CardTitle>
                      <Badge>Active</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold">{formatCurrency(auction.currentBid)}</div>
                          <div className="text-sm text-muted-foreground">Your max bid: {formatCurrency(auction.currentBid + 50)}</div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/auctions/${auction.id}`}>Increase Bid</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="won" className="space-y-4">
            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {wonAuctions.map(auction => (
                <Card key={auction.id} className="border-primary/50 bg-primary/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                      {auction.title}
                    </CardTitle>
                    <Badge className="bg-primary">Won</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-2xl font-bold">{formatCurrency(auction.currentBid)}</div>
                      <Button size="sm" asChild>
                        <Link href={`/checkout/${auction.id}`}>Pay Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-4">
            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {watchlist.map(auction => (
                <Card key={auction.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                      <Link href={`/auctions/${auction.id}`} className="hover:underline">
                        {auction.title}
                      </Link>
                    </CardTitle>
                    <Badge variant="outline">Watching</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xl font-bold">{formatCurrency(auction.currentBid)}</div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/auctions/${auction.id}`}>View Auction</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="john.doe@example.com" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  )
}
