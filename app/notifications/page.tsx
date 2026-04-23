"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { motion } from "motion/react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Auction Won!",
      description: "Congratulations! You won the auction for 'Vintage Leica M3 Camera'.",
      time: "2 hours ago",
      type: "success",
      read: false
    },
    {
      id: 2,
      title: "Outbid Alert",
      description: "You have been outbid on 'Eames Lounge Chair'. Place a new bid now!",
      time: "5 hours ago",
      type: "warning",
      read: true
    },
    {
      id: 3,
      title: "Payment Reminder",
      description: "Please complete payment for your won item #12345.",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your auction activity.</p>
          </div>
          <Badge variant="secondary">{notifications.filter(n => !n.read).length} Unread</Badge>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className={notification.read ? "opacity-70" : "border-primary/50"}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> :
                     notification.type === 'warning' ? <AlertTriangle className="h-5 w-5" /> :
                     <Info className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
                    <CardDescription className="mt-1">{notification.description}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}
