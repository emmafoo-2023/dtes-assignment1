"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAppStore from "@/lib/store"
import { Trophy, Calendar, Target, CheckCircle, Clock } from "lucide-react"

export default function ChallengesPage() {
  const { challenges, joinChallenge, leaveChallenge } = useAppStore()

  const activeChallenges = challenges.filter((c) => c.isActive)
  const availableChallenges = challenges.filter((c) => !c.isActive)

  const getProgressPercentage = (challenge: any) => {
    if (!challenge.progress || !challenge.goal) return 0
    return Math.min((challenge.progress / challenge.goal) * 100, 100)
  }

  const getDaysRemaining = () => {
    // Mock 7 days remaining for all challenges
    return 7
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container-responsive py-8 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Challenges</h1>
            <p className="text-muted-foreground">Join challenges and earn rewards</p>
          </div>

          <Tabs defaultValue="my-challenges" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-challenges">My Challenges</TabsTrigger>
              <TabsTrigger value="all-challenges">All</TabsTrigger>
            </TabsList>

            <TabsContent value="my-challenges" className="space-y-4">
              {activeChallenges.length === 0 ? (
                <Card className="glass-effect glass-effect-dark shadow-md border-muted/20">
                  <CardContent className="p-8 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active challenges</p>
                    <p className="text-sm text-muted-foreground mt-2">Join a challenge to get started!</p>
                  </CardContent>
                </Card>
              ) : (
                activeChallenges.map((challenge) => (
                  <Card key={challenge.id} className="glass-effect glass-effect-dark shadow-lg border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                          <CardDescription>{challenge.description}</CardDescription>
                        </div>
                        {challenge.isCompleted && <CheckCircle className="h-6 w-6 text-primary" />}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {challenge.progress || 0} / {challenge.goal}
                          </span>
                        </div>
                        <Progress value={getProgressPercentage(challenge)} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{getDaysRemaining()} days left</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-chart-4" />
                          <span>{challenge.pointsReward} points</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => leaveChallenge(challenge.id)}
                          className="flex-1"
                        >
                          Leave Challenge
                        </Button>
                        {challenge.isCompleted && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">Completed!</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="all-challenges" className="space-y-4">
              {availableChallenges.map((challenge) => (
                <Card key={challenge.id} className="glass-effect glass-effect-dark shadow-lg border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>Target: {challenge.goal}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-chart-4" />
                        <span>{challenge.pointsReward} points</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>7 days remaining</span>
                    </div>

                    <div className="bg-accent/50 p-3 rounded-lg border border-border/50">
                      <p className="text-sm font-medium mb-1">Rules:</p>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>

                    <Button
                      onClick={() => joinChallenge(challenge.id)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Join Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
