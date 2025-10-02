"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserState, LogEntry, Post } from "./types"
import { INITIAL_CHALLENGES, DISHES, MOCK_POSTS } from "./data"

interface AppStore extends UserState {
  // Actions
  logMeal: (dishId: string, imageUrl?: string) => void
  joinChallenge: (challengeId: string) => void
  leaveChallenge: (challengeId: string) => void
  checkChallenges: (logEntry: LogEntry) => string[]
  addPost: (post: Omit<Post, "id" | "timestamp">) => void
  toggleLike: (postId: string) => void
  saveDeal: (dealId: string) => void
  unsaveDeal: (dealId: string) => void
  calculateStreak: () => number
  getWeeklyTotal: () => number
}

// Helper function to create initial logs with fake data
const createInitialLogs = (): LogEntry[] => {
  const logs: LogEntry[] = []
  const now = new Date()

  // Create logs for the past 14 days with varying meals
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add 1-3 meals per day
    const mealsPerDay = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < mealsPerDay; j++) {
      const dish = DISHES[Math.floor(Math.random() * DISHES.length)]
      logs.push({
        id: `log-${date.getTime()}-${j}`,
        dishId: dish.id,
        dishName: dish.name,
        co2e_kg: dish.co2e_kg,
        timestamp: new Date(date.getTime() + j * 3600000), // Space meals by hours
        imageUrl: dish.isPlantBased ? "/plant-based-meal.jpg" : "/meat-dish.jpg",
      })
    }
  }

  return logs
}

// Helper function to create initial challenges with progress
const createInitialChallenges = (): typeof INITIAL_CHALLENGES => {
  return INITIAL_CHALLENGES.map((challenge, index) => ({
    ...challenge,
    isActive: index < 2, // Make first 2 challenges active
    progress: index === 0 ? 1 : index === 1 ? 2 : 0, // Add some progress
  }))
}

const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      logs: createInitialLogs(),
      challenges: createInitialChallenges(),
      points: 850, // Starting points
      streakDays: 0,
      weeklyTotals: [],
      posts: MOCK_POSTS,
      savedDeals: [],
      badges: [],

      // Actions
      logMeal: (dishId: string, imageUrl?: string) => {
        const dish = DISHES.find((d) => d.id === dishId)
        if (!dish) return

        const logEntry: LogEntry = {
          id: `log-${Date.now()}`,
          dishId,
          dishName: dish.name,
          co2e_kg: dish.co2e_kg,
          timestamp: new Date(),
          imageUrl,
        }

        set((state) => {
          const newLogs = [...state.logs, logEntry]
          const challengeResults = get().checkChallenges(logEntry)

          return {
            logs: newLogs,
            streakDays: get().calculateStreak(),
          }
        })
      },

      joinChallenge: (challengeId: string) => {
        set((state) => ({
          challenges: state.challenges.map((c) => (c.id === challengeId ? { ...c, isActive: true } : c)),
        }))
      },

      leaveChallenge: (challengeId: string) => {
        set((state) => ({
          challenges: state.challenges.map((c) => (c.id === challengeId ? { ...c, isActive: false, progress: 0 } : c)),
        }))
      },

      checkChallenges: (logEntry: LogEntry) => {
        const results: string[] = []
        const dish = DISHES.find((d) => d.id === logEntry.dishId)
        if (!dish) return results

        set((state) => {
          const updatedChallenges = state.challenges.map((challenge) => {
            if (!challenge.isActive || challenge.isCompleted) return challenge

            let newProgress = challenge.progress
            let completed = false

            switch (challenge.rule) {
              case "meatless_monday":
                if (dish.isPlantBased && new Date().getDay() === 1) {
                  newProgress = Math.min(challenge.goal, challenge.progress + 1)
                  if (newProgress >= challenge.goal) {
                    completed = true
                    results.push(`${challenge.title} completed! +${challenge.pointsReward} points`)
                  } else {
                    results.push(`${challenge.title} progress updated!`)
                  }
                }
                break

              case "plant_meals_per_week":
                if (dish.isPlantBased) {
                  newProgress = Math.min(challenge.goal, challenge.progress + 1)
                  if (newProgress >= challenge.goal) {
                    completed = true
                    results.push(`${challenge.title} completed! +${challenge.pointsReward} points`)
                  } else {
                    results.push(`${challenge.title} progress updated!`)
                  }
                }
                break

              case "red_meat_swap":
                // Check if there was a red meat log in the last 7 days
                const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                const recentRedMeatLog = state.logs.find((log) => {
                  const logDish = DISHES.find((d) => d.id === log.dishId)
                  return (
                    logDish &&
                    (logDish.tags.includes("beef") || logDish.tags.includes("pork")) &&
                    new Date(log.timestamp) > sevenDaysAgo
                  )
                })

                if (dish.isPlantBased && recentRedMeatLog) {
                  newProgress = 1
                  completed = true
                  results.push(`${challenge.title} completed! +${challenge.pointsReward} points`)
                }
                break
            }

            return {
              ...challenge,
              progress: newProgress,
              isCompleted: completed,
            }
          })

          const pointsEarned = updatedChallenges
            .filter((c) => c.isCompleted && !state.challenges.find((sc) => sc.id === c.id)?.isCompleted)
            .reduce((sum, c) => sum + c.pointsReward, 0)

          return {
            challenges: updatedChallenges,
            points: state.points + pointsEarned,
          }
        })

        return results
      },

      addPost: (postData) => {
        const newPost: Post = {
          ...postData,
          id: `post-${Date.now()}`,
          timestamp: new Date().toISOString(),
        }

        set((state) => ({
          posts: [newPost, ...state.posts],
        }))
      },

      toggleLike: (postId: string) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                }
              : post,
          ),
        }))
      },

      saveDeal: (dealId: string) => {
        set((state) => ({
          savedDeals: [...state.savedDeals, dealId],
        }))
      },

      unsaveDeal: (dealId: string) => {
        set((state) => ({
          savedDeals: state.savedDeals.filter((id) => id !== dealId),
        }))
      },

      calculateStreak: () => {
        const { logs } = get()
        if (logs.length === 0) return 0

        const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        let streak = 0
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        for (let i = 0; i < sortedLogs.length; i++) {
          const logDate = new Date(sortedLogs[i].timestamp)
          logDate.setHours(0, 0, 0, 0)

          if (logDate.getTime() === currentDate.getTime()) {
            streak++
            currentDate.setDate(currentDate.getDate() - 1)
          } else if (logDate.getTime() < currentDate.getTime()) {
            break
          }
        }

        return streak
      },

      getWeeklyTotal: () => {
        const { logs } = get()
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

        return logs.filter((log) => new Date(log.timestamp) > oneWeekAgo).reduce((sum, log) => sum + log.co2e_kg, 0)
      },
    }),
    {
      name: "greenplate-storage",
    },
  ),
)

export default useAppStore
