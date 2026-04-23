"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Shield, Award } from "lucide-react"
import Image from "next/image"
import { motion } from "motion/react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-20 text-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4" variant="secondary">Our Mission</Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
                Revolutionizing the Way You Bid
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Proaucs is dedicated to creating a transparent, secure, and exciting marketplace for buyers and sellers worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Trust & Security", desc: "We prioritize your safety with rigorous verification and secure payments." },
              { icon: Globe, title: "Global Reach", desc: "Connect with buyers and sellers from over 50 countries." },
              { icon: Users, title: "Community First", desc: "Building a vibrant community of collectors and enthusiasts." },
              { icon: Award, title: "Excellence", desc: "Curating only the highest quality items for our auctions." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 border-none shadow-none bg-transparent h-full">
                  <CardContent>
                    <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg">
                    <Image 
                      src={`https://picsum.photos/seed/person${i}/400/400`} 
                      alt="Team Member" 
                      fill
                      className="object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Alex Morgan</h3>
                  <p className="text-primary text-sm">Co-Founder & CEO</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
