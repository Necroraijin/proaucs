"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createAuction, updateAuction, Auction } from "@/lib/services"
import { useAuth } from "@/components/auth-provider"
import { ShieldAlert } from "lucide-react"

interface AuctionFormProps {
  initialData?: Auction
  isEditing?: boolean
}

export function AuctionForm({ initialData, isEditing = false }: AuctionFormProps) {
  const router = useRouter()
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    startingBid: initialData?.startingBid || "",
    imageUrl: initialData?.imageUrl || "",
    endTime: initialData?.endTime ? new Date(initialData.endTime).toISOString().slice(0, 16) : "",
    category: initialData?.category || "",
    emdAmount: initialData?.emdAmount || ""
  })

  // Prevent regular users from rendering or using the form directly if they manage to navigate to it
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/")
      toast.error("You do not have permission to manage auctions.")
    }
  }, [user, isAdmin, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !isAdmin) {
      toast.error("You must be logged in as admin to do this.")
      return
    }
    setLoading(true)

    try {
      const payload = {
        ...formData,
        startingBid: Number(formData.startingBid),
        emdAmount: Number(formData.emdAmount)
      }

      if (isEditing && initialData) {
        await updateAuction(initialData.id, payload)
        toast.success("Auction updated successfully")
      } else {
        await createAuction({
          ...payload,
          sellerId: user.id
        })
        toast.success("Auction created successfully")
      }
      router.push("/admin")
    } catch (error) {
      toast.error("Failed to save auction")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return <div>Checking permissions...</div>

  if (!isAdmin) {
     return (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/50">
          <ShieldAlert className="h-8 w-8 text-destructive mb-2" />
          <h3 className="font-semibold">Access Denied</h3>
          <p className="text-sm text-muted-foreground">Only administrators can create or edit auctions.</p>
        </div>
     )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Auction" : "Create New Auction"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startingBid">Starting Bid ($)</Label>
              <Input 
                id="startingBid" 
                name="startingBid" 
                type="number" 
                min="0" 
                step="0.01"
                value={formData.startingBid} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emdAmount">EMD Amount ($)</Label>
              <Input 
                id="emdAmount" 
                name="emdAmount" 
                type="number" 
                min="0" 
                step="0.01"
                value={formData.emdAmount} 
                onChange={handleChange} 
                required 
                placeholder="e.g. 500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input 
              id="endTime" 
              name="endTime" 
              type="datetime-local" 
              value={formData.endTime} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : (isEditing ? "Update Auction" : "Create Auction")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
