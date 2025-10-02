export interface Dish {
  id: string
  name: string
  category: "meat" | "plant"
  tags: string[]
  co2e_kg: number
  suggestedPlantSwapId?: string
  isPlantBased: boolean
}

export interface LogEntry {
  id: string
  dishId: string
  dishName: string
  co2e_kg: number
  timestamp: Date
  imageUrl?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  rule: "meatless_monday" | "plant_meals_per_week" | "red_meat_swap"
  goal: number
  progress: number
  pointsReward: number
  deadline: Date
  isActive: boolean
  isCompleted: boolean
}

export interface Post {
  id: string
  author: string
  avatar?: string
  timestamp: string | Date
  content: string
  image?: string
  likes: number
  comments: number
  isLiked: boolean
}

export interface Deal {
  id: string
  title: string
  description: string
  category: "plant" | "veg" | "regional_meat"
  price: string
  discount?: string
  isSaved: boolean
}

export interface UserState {
  logs: LogEntry[]
  challenges: Challenge[]
  points: number
  streakDays: number
  weeklyTotals: { week: string; co2e: number }[]
  posts: Post[]
  savedDeals: string[]
  badges: string[]
}
