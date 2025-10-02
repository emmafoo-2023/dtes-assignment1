import type { Dish, Challenge, Deal, Post } from "./types"

export const DISHES: Dish[] = [
  {
    id: "beef-noodle-soup",
    name: "Beef noodle soup",
    category: "meat",
    tags: ["beef", "noodles"],
    co2e_kg: 3.2,
    suggestedPlantSwapId: "tofu-laksa",
    isPlantBased: false,
  },
  {
    id: "chicken-rice",
    name: "Chicken rice",
    category: "meat",
    tags: ["chicken", "rice"],
    co2e_kg: 1.8,
    suggestedPlantSwapId: "tempeh-rice-bowl",
    isPlantBased: false,
  },
  {
    id: "pork-belly-rice",
    name: "Pork belly rice",
    category: "meat",
    tags: ["pork", "rice"],
    co2e_kg: 2.4,
    suggestedPlantSwapId: "tempeh-rice-bowl",
    isPlantBased: false,
  },
  {
    id: "tofu-laksa",
    name: "Tofu laksa",
    category: "plant",
    tags: ["tofu", "noodles"],
    co2e_kg: 0.4,
    isPlantBased: true,
  },
  {
    id: "tempeh-rice-bowl",
    name: "Tempeh rice bowl",
    category: "plant",
    tags: ["tempeh", "rice"],
    co2e_kg: 0.5,
    isPlantBased: true,
  },
  {
    id: "veggie-noodles",
    name: "Veggie noodles",
    category: "plant",
    tags: ["vegetables", "noodles"],
    co2e_kg: 0.6,
    isPlantBased: true,
  },
]

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "meatless-monday",
    title: "Meatless Monday",
    description: "Log a plant-based dish on Monday",
    rule: "meatless_monday",
    goal: 1,
    progress: 0,
    pointsReward: 50,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: false,
    isCompleted: false,
  },
  {
    id: "plant-meals-week",
    title: "3 Plant-based Meals This Week",
    description: "Log 3 plant-based meals within 7 days",
    rule: "plant_meals_per_week",
    goal: 3,
    progress: 0,
    pointsReward: 100,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: false,
    isCompleted: false,
  },
  {
    id: "red-meat-swap",
    title: "Swap One Red-Meat Dish This Week",
    description: "Follow a red meat meal with a plant-based alternative within 7 days",
    rule: "red_meat_swap",
    goal: 1,
    progress: 0,
    pointsReward: 75,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: false,
    isCompleted: false,
  },
]

export const DEALS: Deal[] = [
  {
    id: "local-tofu-pack",
    title: "Local tofu pack",
    description: "~90% less CO₂e than beef",
    category: "plant",
    price: "$3.50",
    discount: "20% off",
    isSaved: false,
  },
  {
    id: "tempeh-regional",
    title: "Tempeh (regional)",
    description: "Protein-rich, low CO₂e",
    category: "plant",
    price: "$4.20",
    isSaved: false,
  },
  {
    id: "fresh-veg-box",
    title: "Fresh veg box (local)",
    description: "Seasonal vegetables from local farms",
    category: "veg",
    price: "$12.00",
    discount: "15% off",
    isSaved: false,
  },
  {
    id: "regional-chicken",
    title: "Regional chicken option",
    description: "Lower CO₂e than imported red meat",
    category: "regional_meat",
    price: "$8.50",
    isSaved: false,
  },
]

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    author: "Sarah Chen",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    content: "Just tried this amazing tofu laksa! So much better than I expected and way better for the planet 🌱",
    image: "/tofu-laksa-bowl.jpg",
    likes: 24,
    comments: 5,
    isLiked: false,
  },
  {
    id: "post-2",
    author: "Marcus Lim",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    content: "Week 3 of my plant-based journey! Feeling great and my carbon footprint is way down 💪",
    likes: 18,
    comments: 3,
    isLiked: false,
  },
  {
    id: "post-3",
    author: "Priya Kumar",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    content: "Made tempeh rice bowl for the first time. The family loved it! Recipe in comments 👇",
    image: "/tempeh-rice-bowl.jpg",
    likes: 32,
    comments: 8,
    isLiked: true,
  },
  {
    id: "post-4",
    author: "David Wong",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    content: "Hit my 30-day streak today! 🎉 Small changes really do add up",
    likes: 45,
    comments: 12,
    isLiked: false,
  },
  {
    id: "post-5",
    author: "Emma Tan",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    content: "Swapped my usual beef noodles for veggie noodles today. Saved 2.6kg of CO2e! 🌍",
    image: "/vegetable-noodles.jpg",
    likes: 21,
    comments: 4,
    isLiked: false,
  },
]

export const MOCK_FRIENDS = [
  { id: "friend-1", name: "Sarah Chen", points: 450 },
  { id: "friend-2", name: "Marcus Lim", points: 380 },
  { id: "friend-3", name: "Priya Kumar", points: 320 },
]
