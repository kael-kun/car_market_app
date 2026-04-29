export interface User {
  id: string
  email: string
  username?: string
  password_hash?: string
  role: 'buyer' | 'seller' | 'admin'
  created_at: string
  updated_at: string
}

export interface Listing {
  id: string
  seller_id: string
  title: string
  price: number
  brand: string
  model: string
  year: number
  mileage: number
  transmission: 'automatic' | 'manual'
  fuel_type: 'gas' | 'diesel' | 'electric' | 'hybrid'
  location: string
  description: string
  image_urls: string[]
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  listing_id: string
  content: string
  read: boolean
  created_at: string
}
