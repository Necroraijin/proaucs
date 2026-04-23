// Mock Data Store

export interface Auction {
  id: string
  title: string
  description: string
  imageUrl: string
  currentBid: number
  startingBid: number
  endTime: string // ISO string
  bids: number
  category: string
  status: 'active' | 'ended' | 'upcoming'
}

export const MOCK_AUCTIONS: Auction[] = [
  {
    id: '1',
    title: 'Vintage Leica M3 Camera',
    description: 'A pristine condition Leica M3 from 1954. Includes original lens cap and leather strap. Fully functional and serviced.',
    imageUrl: 'https://picsum.photos/seed/camera/600/400',
    currentBid: 1250,
    startingBid: 800,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
    bids: 12,
    category: 'Electronics',
    status: 'active'
  },
  {
    id: '2',
    title: 'Eames Lounge Chair & Ottoman',
    description: 'Authentic Herman Miller Eames Lounge Chair. Walnut wood finish with black leather. A mid-century modern classic.',
    imageUrl: 'https://picsum.photos/seed/chair/600/400',
    currentBid: 3400,
    startingBid: 2500,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // 4 hours from now
    bids: 28,
    category: 'Furniture',
    status: 'active'
  },
  {
    id: '3',
    title: '1969 Ford Mustang Boss 429 Model',
    description: '1:18 scale diecast model of the legendary Boss 429. Limited edition, numbered certificate included.',
    imageUrl: 'https://picsum.photos/seed/car/600/400',
    currentBid: 150,
    startingBid: 50,
    endTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins from now
    bids: 8,
    category: 'Collectibles',
    status: 'active'
  },
  {
    id: '4',
    title: 'MacBook Pro M3 Max',
    description: 'Brand new, sealed box. 16-inch, 48GB RAM, 1TB SSD. Space Black.',
    imageUrl: 'https://picsum.photos/seed/laptop/600/400',
    currentBid: 2800,
    startingBid: 2000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days
    bids: 5,
    category: 'Electronics',
    status: 'active'
  },
  {
    id: '5',
    title: 'Abstract Oil Painting "Green Dreams"',
    description: 'Original artwork by upcoming artist. 24x36 inches, oil on canvas. Signed and dated.',
    imageUrl: 'https://picsum.photos/seed/art/600/400',
    currentBid: 450,
    startingBid: 200,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day
    bids: 15,
    category: 'Art',
    status: 'active'
  },
  {
    id: '6',
    title: 'Rolex Submariner Date',
    description: 'Pre-owned, excellent condition. Box and papers included. 2021 model.',
    imageUrl: 'https://picsum.photos/seed/watch/600/400',
    currentBid: 9500,
    startingBid: 8000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(), // 12 hours
    bids: 42,
    category: 'Jewelry',
    status: 'active'
  }
]
