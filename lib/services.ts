import { supabase } from "@/lib/supabase"

export interface Auction {
  id: string
  title: string
  description: string
  startingBid: number
  imageUrl: string
  endTime: string
  category: string
  currentBid: number
  bids: number
  status: 'active' | 'ended'
  sellerId: string
  createdAt: string
  emdAmount: number
}

export interface Participant {
  userId: string
  auctionId: string
  status: 'pending' | 'approved' | 'rejected'
  paymentReference: string
  requestedAt: string
  userName?: string
  userEmail?: string
}

export const createAuction = async (auctionData: Omit<Auction, 'id' | 'currentBid' | 'bids' | 'status' | 'createdAt'>) => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .insert({
        ...auctionData,
        currentBid: auctionData.startingBid,
        bids: 0,
        status: 'active',
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return data.id
  } catch (error) {
    console.error("Error creating auction:", error)
    throw error
  }
}

export const updateAuction = async (id: string, data: Partial<Auction>) => {
  try {
    const { error } = await supabase
      .from('auctions')
      .update(data)
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error("Error updating auction:", error)
    throw error
  }
}

export const getAuction = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Auction
  } catch (error) {
    console.error("Error getting auction:", error)
    throw error
  }
}

export const getAllAuctions = async () => {
  try {
    const { data, error } = await supabase
      .from('auctions')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
    return data as Auction[]
  } catch (error) {
    console.error("Error getting auctions:", error)
    throw error
  }
}

export const placeBid = async (auctionId: string, userId: string, amount: number) => {
  try {
    // Call a Postgres function or use transactions if needed.
    // For simplicity, we update the auction record and insert into bids table
    const { error: bidError } = await supabase
      .from('bids')
      .insert({
        auction_id: auctionId,
        user_id: userId,
        amount: amount
      })

    if (bidError) throw bidError

    // Also update current bid on the auction (should be handled via trigger in real-world Postgres, but updating directly here)
    const { data: auction } = await supabase
      .from('auctions')
      .select('bids')
      .eq('id', auctionId)
      .single()

    const { error: updateError } = await supabase
      .from('auctions')
      .update({
        currentBid: amount,
        bids: (auction?.bids || 0) + 1
      })
      .eq('id', auctionId)

    if (updateError) throw updateError

    return true
  } catch (error) {
    console.error("Error placing bid:", error)
    throw error
  }
}

export const submitEmdPayment = async (auctionId: string, userId: string, paymentReference: string, userDetails: { name: string, email: string }) => {
  try {
    const { error } = await supabase
      .from('participants')
      .upsert({
        userId,
        auctionId,
        status: 'pending',
        paymentReference,
        requestedAt: new Date().toISOString(),
        userName: userDetails.name,
        userEmail: userDetails.email
      }, { onConflict: 'userId, auctionId' })

    if (error) throw error
  } catch (error) {
    console.error("Error submitting EMD:", error)
    throw error
  }
}

export const getParticipantStatus = async (auctionId: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('auctionId', auctionId)
      .eq('userId', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is no rows returned
    return data as Participant | null
  } catch (error) {
    console.error("Error getting participant status:", error)
    return null
  }
}

export const getAuctionParticipants = async (auctionId: string) => {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('auctionId', auctionId)

    if (error) throw error
    return data as Participant[]
  } catch (error) {
    console.error("Error getting participants:", error)
    throw error
  }
}

export const updateParticipantStatus = async (auctionId: string, userId: string, status: 'approved' | 'rejected') => {
  try {
    const { error } = await supabase
      .from('participants')
      .update({ status })
      .eq('auctionId', auctionId)
      .eq('userId', userId)

    if (error) throw error
  } catch (error) {
    console.error("Error updating participant status:", error)
    throw error
  }
}
