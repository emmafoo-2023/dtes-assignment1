"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import useAppStore from "@/lib/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LabelList, Tooltip } from "recharts"
import { Leaf, Trophy, Target, TrendingUp, Award, Star, Zap, Heart } from "lucide-react"

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const { logs, challenges, points, posts, getWeeklyTotal, calculateStreak } = useAppStore()

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dayLogs = logs.filter((log) => {
      const logDate = new Date(log.timestamp)
      return logDate.toDateString() === date.toDateString()
    })
    const totalConsumption = dayLogs.reduce((sum, log) => sum + log.co2e_kg, 0)
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      consumption: totalConsumption,
      consumptionFormatted: totalConsumption > 0 ? `${totalConsumption.toFixed(2)}kg` : '',
      meals: dayLogs.length,
    }
  })

  const totalCO2eConsumed = logs.reduce((sum, log) => sum + log.co2e_kg, 0)
  const totalMeals = logs.length
  const completedChallenges = challenges.filter((c) => c.isCompleted).length
  const daysWithMeals = weeklyData.filter(day => day.consumption > 0).length
  const avgDailyConsumption = daysWithMeals > 0 ? totalCO2eConsumed / daysWithMeals : 0
  const currentStreak = calculateStreak()

  const plantBasedCount = logs.filter((log) => {
    const dish = useAppStore.getState().logs.find((l) => l.id === log.id)
    return (
      log.dishName.toLowerCase().includes("tofu") ||
      log.dishName.toLowerCase().includes("tempeh") ||
      log.dishName.toLowerCase().includes("veggie")
    )
  }).length

  const meatCount = logs.length - plantBasedCount

  const mealTypeData = [
    { name: "Plant-based", value: plantBasedCount, color: "#22c55e" },
    { name: "Meat-based", value: meatCount, color: "#f97316" },
  ].filter((item) => item.value > 0)

  const leaderboard = [
    { name: "You", points: isClient ? points : 0, rank: 1 },
    { name: "Sarah L.", points: 2840, rank: 2 },
    { name: "Mike C.", points: 2650, rank: 3 },
    { name: "Emma W.", points: 2420, rank: 4 },
    { name: "David K.", points: 2180, rank: 5 },
  ]
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({ ...user, rank: index + 1 }))

  const availableBadges = [
    { id: "eco-warrior", name: "Eco Warrior", icon: Leaf, earned: totalCO2eConsumed >= 50, color: "text-green-500" },
    { id: "streak-master", name: "Streak Master", icon: Zap, earned: currentStreak >= 7, color: "text-yellow-500" },
    {
      id: "challenge-champion",
      name: "Challenge Champion",
      icon: Trophy,
      earned: completedChallenges >= 3,
      color: "text-blue-500",
    },
    { id: "community-star", name: "Community Star", icon: Star, earned: posts.length >= 5, color: "text-purple-500" },
    { id: "plant-lover", name: "Plant Lover", icon: Heart, earned: plantBasedCount >= 10, color: "text-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container-responsive py-6 pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Your Impact Dashboard</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track your eco-friendly journey and celebrate your wins!
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CO₂e Tracked</p>
                    <p className="text-xl lg:text-2xl font-bold text-primary">{totalCO2eConsumed.toFixed(1)}kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect glass-effect-dark shadow-lg border-chart-2/20">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <Target className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meals Logged</p>
                    <p className="text-xl lg:text-2xl font-bold text-chart-2">{totalMeals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect glass-effect-dark shadow-lg border-chart-4/20">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-chart-4/10">
                    <Trophy className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Points</p>
                    <p className="text-xl lg:text-2xl font-bold text-chart-4">{points}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect glass-effect-dark shadow-lg border-chart-5/20">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-chart-5/10">
                    <TrendingUp className="h-5 w-5 text-chart-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Avg</p>
                    <p className="text-xl lg:text-2xl font-bold text-chart-5">{avgDailyConsumption.toFixed(1)}kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>CO₂e (This Week)</span>
                </CardTitle>
                <CardDescription>Daily consumption breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={isClient ? weeklyData : []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="consumptionFormatted" position="top" style={{ fill: "hsl(var(--foreground))", fontSize: '12px', fontWeight: '500' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span>Meal Categories</span>
                </CardTitle>
                <CardDescription>Your food choices breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {mealTypeData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={isClient ? mealTypeData : []}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {mealTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {mealTypeData.map((item) => (
                        <div key={item.name} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">
                            {item.name} ({item.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                    No meal data yet. Start logging meals!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="glass-effect glass-effect-dark shadow-lg border-chart-4/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-chart-4" />
                  <span>Friends Leaderboard</span>
                </CardTitle>
                <CardDescription>See how you stack up against friends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      user.name === "You"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-accent/50 border border-border/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? "bg-chart-4 text-chart-4-foreground"
                          : index === 1
                            ? "bg-muted text-muted-foreground"
                            : index === 2
                              ? "bg-chart-5 text-chart-5-foreground"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.points} points</p>
                    </div>
                    {index === 0 && <Trophy className="h-5 w-5 text-chart-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect glass-effect-dark shadow-lg border-chart-3/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-chart-3" />
                  <span>Achievement Badges</span>
                </CardTitle>
                <CardDescription>Your eco-friendly accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {availableBadges.map((badge) => {
                    const IconComponent = badge.icon
                    const earned = isClient ? badge.earned : false
                    return (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-lg border transition-all ${
                          earned
                            ? "bg-primary/5 border-primary/20 shadow-sm"
                            : "bg-muted/50 border-border/50 opacity-60"
                        }`}
                      >
                        <div className="text-center space-y-2">
                          <IconComponent
                            className={`h-8 w-8 mx-auto ${earned ? badge.color : "text-muted-foreground"}`}
                          />
                          <p
                            className={`text-sm font-medium ${earned ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {badge.name}
                          </p>
                          {earned && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              Earned!
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect shadow-lg border-chart-5/20 bg-gradient-to-r from-chart-5/10 to-chart-4/10">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">Current Streak</h3>
                  <p className="text-muted-foreground">Keep up the great work!</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl lg:text-4xl font-bold text-chart-4">{isClient ? currentStreak : 0}</p>
                  <p className="text-muted-foreground">days</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={isClient ? (currentStreak % 7) * 14.28 : 0} className="bg-muted/50" />
                <p className="text-sm mt-2 text-muted-foreground">
                  {isClient ? 7 - (currentStreak % 7) : 7} days until next milestone
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
