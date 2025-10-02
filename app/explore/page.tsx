"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Clock, Leaf, ChevronLeft, ChevronRight } from "lucide-react"

const topSwaps = [
  {
    id: "swap-1",
    from: "Beef",
    to: "Tempeh",
    co2eSaved: "25kg",
    description: "Per kg of protein",
  },
  {
    id: "swap-2",
    from: "Chicken",
    to: "Tofu",
    co2eSaved: "4.5kg",
    description: "Per kg of protein",
  },
  {
    id: "swap-3",
    from: "Pork",
    to: "Mushrooms",
    co2eSaved: "8kg",
    description: "Per kg of protein",
  },
  {
    id: "swap-4",
    from: "Lamb",
    to: "Lentils",
    co2eSaved: "30kg",
    description: "Per kg of protein",
  },
]

const recipes = [
  {
    id: "recipe-1",
    title: "Plant-Based Laksa",
    prepTime: "25 min",
    co2eNote: "Saves 2.3kg CO₂e vs traditional laksa",
    image: "/plant-based-laksa-with-tofu-and-vegetables.jpg",
    ingredients: ["Rice noodles", "Firm tofu", "Coconut milk", "Laksa paste", "Bean sprouts", "Bok choy"],
    steps: [
      "Fry tofu until golden and crispy",
      "Simmer laksa paste with coconut milk and vegetable broth",
      "Add noodles and vegetables, cook for 5 minutes",
    ],
  },
  {
    id: "recipe-2",
    title: "Mushroom Char Siu Bao",
    prepTime: "45 min",
    co2eNote: "Saves 1.8kg CO₂e vs pork char siu",
    image: "/steamed-buns-with-mushroom-filling.jpg",
    ingredients: ["King oyster mushrooms", "Hoisin sauce", "Soy sauce", "Bao dough", "Sesame oil"],
    steps: [
      "Marinate sliced mushrooms in char siu sauce overnight",
      "Roast mushrooms until caramelized",
      "Steam filled bao buns for 12-15 minutes",
    ],
  },
  {
    id: "recipe-3",
    title: "Tempeh Rendang",
    prepTime: "40 min",
    co2eNote: "Saves 3.2kg CO₂e vs beef rendang",
    image: "/tempeh-rendang-with-coconut-curry.jpg",
    ingredients: ["Tempeh", "Rendang paste", "Coconut milk", "Lemongrass", "Kaffir lime leaves"],
    steps: [
      "Cube and pan-fry tempeh until golden",
      "Simmer rendang paste with coconut milk and aromatics",
      "Add tempeh and cook until sauce thickens",
    ],
  },
  {
    id: "recipe-4",
    title: "Vegetarian Nasi Lemak",
    prepTime: "30 min",
    co2eNote: "Saves 1.5kg CO₂e vs chicken/fish version",
    image: "/nasi-lemak-with-plant-based-sides.jpg",
    ingredients: ["Coconut rice", "Sambal", "Fried tempeh", "Cucumber", "Peanuts", "Boiled egg (optional)"],
    steps: [
      "Cook rice with coconut milk and pandan leaves",
      "Prepare sambal with dried chilies and belacan substitute",
      "Serve with crispy tempeh and traditional sides",
    ],
  },
  {
    id: "recipe-5",
    title: "Chickpea Satay",
    prepTime: "20 min",
    co2eNote: "Saves 2.1kg CO₂e vs chicken satay",
    image: "/chickpea-satay-skewers-with-peanut-sauce.jpg",
    ingredients: ["Chickpeas", "Satay spices", "Peanut sauce", "Cucumber", "Onion"],
    steps: [
      "Marinate chickpeas in satay spice blend",
      "Skewer and grill until charred",
      "Serve with homemade peanut sauce and pickles",
    ],
  },
  {
    id: "recipe-6",
    title: "Tofu Hainanese Rice",
    prepTime: "35 min",
    co2eNote: "Saves 2.8kg CO₂e vs chicken rice",
    image: "/tofu-with-hainanese-rice-and-chili-sauce.jpg",
    ingredients: ["Silken tofu", "Jasmine rice", "Ginger", "Garlic", "Chili sauce", "Dark soy"],
    steps: [
      "Steam tofu with ginger and scallions",
      "Cook rice in vegetable broth with garlic and ginger",
      "Serve with chili sauce and dark soy dressing",
    ],
  },
  {
    id: "recipe-7",
    title: "Plant-Based Mee Goreng",
    prepTime: "20 min",
    co2eNote: "Saves 1.6kg CO₂e vs prawn/chicken version",
    image: "/vegetarian-mee-goreng-noodles.jpg",
    ingredients: ["Yellow noodles", "Firm tofu", "Bean sprouts", "Tomato", "Chili paste", "Potato"],
    steps: [
      "Stir-fry tofu and vegetables in hot wok",
      "Add noodles with sweet soy and chili paste",
      "Toss everything together and serve hot",
    ],
  },
  {
    id: "recipe-8",
    title: "Jackfruit Curry",
    prepTime: "30 min",
    co2eNote: "Saves 2.5kg CO₂e vs mutton curry",
    image: "/jackfruit-curry-with-spices.jpg",
    ingredients: ["Young jackfruit", "Curry powder", "Coconut milk", "Potatoes", "Curry leaves"],
    steps: [
      "Sauté curry spices with onions and garlic",
      "Add jackfruit and potatoes with coconut milk",
      "Simmer until jackfruit is tender and flavors meld",
    ],
  },
]

const quickFacts = [
  "Beef production generates 25x more CO₂e than plant-based proteins",
  "One plant-based meal a week saves 280kg CO₂e per year",
  "Tofu uses 90% less water than beef to produce",
  "Local vegetables have 50% lower carbon footprint than imported ones",
  "Mushrooms can replace meat texture with 95% less emissions",
  "Lentils provide complete protein with minimal environmental impact",
  "Seasonal produce reduces transport emissions by up to 70%",
  "Plant-based diets can reduce your food carbon footprint by 73%",
]

export default function ExplorePage() {
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recipes)[0] | null>(null)
  const [factIndex, setFactIndex] = useState(0)

  const nextFact = () => setFactIndex((prev) => (prev + 1) % quickFacts.length)
  const prevFact = () => setFactIndex((prev) => (prev - 1 + quickFacts.length) % quickFacts.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container-responsive py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground text-balance">Explore Sustainable Eating</h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto text-balance">
              Learn how simple swaps and delicious recipes can reduce your carbon footprint
            </p>
          </div>

          {/* Top Swaps Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Top Swaps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topSwaps.map((swap) => (
                <Card key={swap.id} className="glass-effect glass-effect-dark shadow-lg border-primary/20">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-muted-foreground line-through">{swap.from}</p>
                      <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                      <p className="text-xl font-bold text-primary">{swap.to}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-3 py-1">
                      Save {swap.co2eSaved} CO₂e
                    </Badge>
                    <p className="text-sm text-muted-foreground">{swap.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recipes Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <Leaf className="h-6 w-6 text-chart-2" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Singapore-Friendly Recipes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Dialog key={recipe.id}>
                  <DialogTrigger asChild>
                    <Card className="glass-effect glass-effect-dark shadow-lg border-border/20 cursor-pointer hover:shadow-xl transition-all group">
                      <CardContent className="p-0">
                        <img
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-5 space-y-3">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.prepTime}</span>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {recipe.co2eNote}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-5 w-5" />
                          <span className="font-medium">{recipe.prepTime}</span>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{recipe.co2eNote}</Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Ingredients</h4>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Steps</h4>
                        <ol className="space-y-3">
                          {recipe.steps.map((step, idx) => (
                            <li key={idx} className="flex space-x-3">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                {idx + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>

          {/* Quick Facts Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Leaf className="h-6 w-6 text-chart-4" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Quick Facts</h2>
            </div>

            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-between space-x-4">
                  <Button variant="ghost" size="icon" onClick={prevFact} className="flex-shrink-0">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <div className="text-center flex-1">
                    <p className="text-lg lg:text-xl text-foreground font-medium leading-relaxed">
                      {quickFacts[factIndex]}
                    </p>
                  </div>

                  <Button variant="ghost" size="icon" onClick={nextFact} className="flex-shrink-0">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                  {quickFacts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFactIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === factIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Regional Sourcing Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-chart-5/10">
                <Leaf className="h-6 w-6 text-chart-5" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Local Matters</h2>
            </div>

            <Card className="glass-effect glass-effect-dark shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Regional & Local Sourcing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  Choosing locally sourced ingredients significantly reduces the carbon footprint of your meals.
                  Transportation accounts for a large portion of food-related emissions, especially for imported goods.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Local Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Up to 70% lower transport emissions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fresher produce with better nutrition</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Supports local farmers and economy</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-chart-2/5 rounded-lg border border-chart-2/20">
                    <h4 className="font-semibold text-chart-2 mb-2">Singapore Sources</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span>Local urban farms for leafy greens</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span>Regional produce from Malaysia & Thailand</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Leaf className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span>Seasonal fruits reduce storage emissions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/50 p-4 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Pro tip:</strong> Look for "locally grown" labels at markets and
                    supermarkets. Even choosing regional over international options makes a significant difference!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
