"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAllAuctions, Auction } from "@/lib/services"
import { useEffect, useState } from "react"
import { formatCurrency, formatTimeLeft } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { motion } from "motion/react"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctions()
        setAuctions(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAuctions()
  }, [])

  const categories = Array.from(new Set(auctions.map(a => a.category)))

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          auction.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? auction.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* ... header ... */}
        
        {/* ... search ... */}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <div className="space-y-2">
                <Button 
                  variant={selectedCategory === null ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* ... price range ... */}
          </aside>

          {/* Auction Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">Loading auctions...</div>
            ) : filteredAuctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions.map((auction, index) => (
                  <motion.div
                    key={auction.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow group">
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image 
                          src={auction.imageUrl} 
                          alt={auction.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-black/70 backdrop-blur-sm">
                            {formatTimeLeft(new Date(auction.endTime))} left
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="mb-2">{auction.category}</Badge>
                        </div>
                        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                          <Link href={`/auctions/${auction.id}`}>{auction.title}</Link>
                        </CardTitle>
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
            ) : (
              <div className="text-center py-20">
                <h3 className="text-lg font-semibold">No auctions found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedCategory(null)}}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
