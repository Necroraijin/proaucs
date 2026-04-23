"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { useState } from "react"
import { motion } from "motion/react"

export default function MessagesPage() {
  const [message, setMessage] = useState("")
  
  const conversations = [
    { id: 1, name: "Seller: John Doe", lastMessage: "Is the item still available?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Buyer: Jane Smith", lastMessage: "I can pick it up tomorrow.", time: "Yesterday", unread: 0 },
  ]

  const messages = [
    { id: 1, sender: "them", text: "Hi, I have a question about the camera condition.", time: "10:00 AM" },
    { id: 2, sender: "me", text: "Sure, what would you like to know?", time: "10:05 AM" },
    { id: 3, sender: "them", text: "Is there any fungus on the lens?", time: "10:10 AM" },
    { id: 4, sender: "me", text: "No, the lens is clean and clear. I can send more photos.", time: "10:15 AM" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 h-[calc(100vh-4rem)] flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 h-full">
          {/* Conversation List */}
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b p-4">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {conversations.map((conv, index) => (
                  <motion.div 
                    key={conv.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${conv.id === 1 ? 'bg-muted' : ''}`}
                  >
                    <Avatar>
                      <AvatarFallback>{conv.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium truncate">{conv.name}</span>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="md:col-span-2 h-full flex flex-col">
            <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">John Doe</CardTitle>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'me' 
                          ? 'bg-primary text-primary-foreground rounded-br-none' 
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t mt-auto">
              <form 
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setMessage("")
                }}
              >
                <Input 
                  placeholder="Type a message..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
