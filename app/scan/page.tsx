"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useAppStore from "@/lib/store"
import { DISHES } from "@/lib/data"
import { Camera, Upload, Leaf, ArrowRight, CheckCircle, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const [step, setStep] = useState<"upload" | "predict" | "confirm" | "logged">("upload")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [predictedDish, setPredictedDish] = useState(DISHES[0])
  const [selectedDish, setSelectedDish] = useState(DISHES[0])
  const [ingredientSuggestions, setIngredientSuggestions] = useState<string[]>([])
  const [sustainabilityTips, setSustainabilityTips] = useState<string[]>([])
  const [challengeResults, setChallengeResults] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { logMeal, checkChallenges, addPost } = useAppStore()
  const router = useRouter()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        // Simulate AI prediction
        const randomDish = DISHES[Math.floor(Math.random() * DISHES.length)]
        setPredictedDish(randomDish)
        setSelectedDish(randomDish)
        setStep("predict")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDishChange = (dishId: string) => {
    const dish = DISHES.find((d) => d.id === dishId)
    if (dish) {
      setSelectedDish(dish)
    }
  }

  const handleConfirm = () => {
    // Generate ingredient suggestions and tips based on meal type
    if (selectedDish.isPlantBased || selectedDish.co2e_kg < 2) {
      // Eco-friendly meal - no ingredient swaps needed
      setIngredientSuggestions([])
      setSustainabilityTips([
        "Look for locally sourced vegetables to reduce transport emissions",
        "Choose seasonal produce for maximum freshness and minimal environmental impact",
        "Consider buying from farmers' markets to support local agriculture"
      ])
    } else {
      // Higher carbon meal - suggest ingredient swaps
      const suggestions: string[] = []
      const tips: string[] = []

      if (selectedDish.name.toLowerCase().includes('beef') || selectedDish.name.toLowerCase().includes('steak')) {
        suggestions.push("Replace beef with mushrooms or jackfruit for a meaty texture")
        suggestions.push("Try plant-based proteins like tempeh or tofu")
        suggestions.push("Use lentils or beans for a protein-rich alternative")
      } else if (selectedDish.name.toLowerCase().includes('chicken')) {
        suggestions.push("Substitute with chickpeas or cauliflower")
        suggestions.push("Try seitan or plant-based chicken alternatives")
        suggestions.push("Use tofu marinated in herbs and spices")
      } else if (selectedDish.name.toLowerCase().includes('pork') || selectedDish.name.toLowerCase().includes('lamb')) {
        suggestions.push("Replace with jackfruit for pulled texture")
        suggestions.push("Use mushrooms like shiitake or portobello")
        suggestions.push("Try seasoned tempeh or textured vegetable protein")
      } else if (selectedDish.name.toLowerCase().includes('fish') || selectedDish.name.toLowerCase().includes('seafood')) {
        suggestions.push("Use hearts of palm or banana blossom for seafood texture")
        suggestions.push("Try nori-wrapped tofu for ocean flavors")
        suggestions.push("Consider plant-based seafood alternatives")
      } else {
        suggestions.push("Add more vegetables to reduce meat portions")
        suggestions.push("Try meatless versions once a week")
        suggestions.push("Use plant proteins as partial substitutes")
      }

      tips.push("Choose grass-fed and locally raised options if continuing with meat")
      tips.push("Buy from local butchers who source sustainably")
      tips.push("Consider reducing portion sizes and adding more vegetables")

      setIngredientSuggestions(suggestions)
      setSustainabilityTips(tips)
    }

    // Log the meal and get challenge results
    logMeal(selectedDish.id, selectedImage || undefined)

    const results = checkChallenges({
      id: `log-${Date.now()}`,
      dishId: selectedDish.id,
      dishName: selectedDish.name,
      co2e_kg: selectedDish.co2e_kg,
      timestamp: new Date(),
      imageUrl: selectedImage || undefined,
    })
    setChallengeResults(results)

    setStep("logged")
  }

  const handleShareToCommunity = () => {
    if (!selectedImage) return

    addPost({
      author: "You",
      content: `Just had ${selectedDish.name}! ${selectedDish.isPlantBased ? `Saved ${selectedDish.co2e_kg}kg CO₂e 🌱` : `Tracked ${selectedDish.co2e_kg}kg CO₂e`}`,
      image: selectedImage,
      likes: 0,
      comments: 0,
      isLiked: false,
    })
    router.push("/community")
  }

  if (step === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="container-responsive py-8 pb-24 lg:pb-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Scan Your Meal</h1>
              <p className="text-muted-foreground">Upload a photo to track your food's carbon impact</p>
            </div>

            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="h-12 w-12 text-primary" />
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      type="button"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="Upload image"
                    />

                    <p className="text-sm text-muted-foreground">Take a photo of your meal or upload from gallery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === "predict") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="container-responsive py-8 pb-24 lg:pb-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dish Detected</h1>
              <p className="text-muted-foreground">Confirm or change the predicted dish</p>
            </div>

            {selectedImage && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Uploaded meal"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span>Predicted Dish</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedDish.id} onValueChange={handleDishChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISHES.map((dish) => (
                      <SelectItem key={dish.id} value={dish.id}>
                        {dish.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-accent/50 p-4 rounded-lg space-y-2 border border-border/50">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CO₂e per serving:</span>
                    <Badge
                      variant={selectedDish.co2e_kg < 2 ? "default" : "secondary"}
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {selectedDish.co2e_kg}kg
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Plant-based:</span>
                    <Badge variant="outline">{selectedDish.isPlantBased ? "Yes" : "No"}</Badge>
                  </div>
                </div>

                <Button
                  onClick={handleConfirm}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Confirm & Log Meal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === "logged") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="container-responsive py-8 pb-24 lg:pb-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-3">
              <CheckCircle className="h-16 w-16 text-primary mx-auto" />
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Meal Logged!</h1>
              <p className="text-muted-foreground">Great job tracking your environmental impact</p>
            </div>

            {/* Challenge Results */}
            {challengeResults.length > 0 && (
              <Card className="glass-effect shadow-lg border-chart-4/20 bg-gradient-to-r from-chart-4/10 to-chart-5/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-chart-4" />
                    <span>Challenge Progress!</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {challengeResults.map((result, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {result}
                    </p>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Feedback Card */}
            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {(selectedDish.isPlantBased || selectedDish.co2e_kg < 2) ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Great Choice! 🌱</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-5 w-5 text-chart-5" />
                      <span>Make It Even Greener!</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {(selectedDish.isPlantBased || selectedDish.co2e_kg < 2)
                    ? "You're making a positive impact on the environment!"
                    : "Here are some ways to reduce your carbon footprint"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ingredient Suggestions */}
                {ingredientSuggestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Ingredient Swaps:</h4>
                    {ingredientSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <p className="text-sm text-muted-foreground">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sustainability Tips */}
                {sustainabilityTips.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      {ingredientSuggestions.length > 0 ? "Additional Tips:" : "Sustainability Tips:"}
                    </h4>
                    {sustainabilityTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">💡</span>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={handleShareToCommunity} className="w-full bg-transparent" variant="outline">
                Share to Community
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
