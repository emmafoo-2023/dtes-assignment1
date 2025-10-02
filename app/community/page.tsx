"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share, Send } from "lucide-react"
import useAppStore from "@/lib/store"

const friendPosts = [
  {
    id: "friend-post-1",
    author: "Sarah Chen",
    avatar: "/asian-woman-smiling.png",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    content:
      "Just tried this amazing plant-based laksa at the hawker center! The tofu was perfectly crispy and the broth was so flavorful. Saved 2.3kg CO₂e today! 🌱",
    image: "/colorful-plant-based-laksa-bowl-with-tofu.jpg",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "friend-post-2",
    author: "Marcus Tan",
    avatar: "/asian-man-casual.jpg",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    content:
      "Meal prep Sunday with chickpea curry and brown rice! Making sustainable choices easier for the week ahead. Who else is meal prepping? 💪",
    image: "/meal-prep-containers-with-chickpea-curry-and-rice.jpg",
    likes: 31,
    comments: 12,
    isLiked: true,
  },
  {
    id: "friend-post-3",
    author: "Priya Kumar",
    avatar: "/indian-woman-smiling.png",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    content:
      "Found this gem of a vegetarian restaurant in Chinatown! Their mushroom char siu bao is incredible. Supporting local and sustainable! 🍄",
    image: "/steamed-buns-with-mushroom-filling.jpg",
    likes: 42,
    comments: 15,
    isLiked: true,
  },
  {
    id: "friend-post-4",
    author: "David Lim",
    avatar: "/asian-man-glasses.png",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    content:
      "Week 3 of my plant-based journey! Feeling more energetic and my carbon footprint is down by 15kg this month. Small changes, big impact! 🌍",
    image: "/variety-of-colorful-vegetables-and-fruits.jpg",
    likes: 56,
    comments: 23,
    isLiked: false,
  },
  {
    id: "friend-post-5",
    author: "Aisha Rahman",
    avatar: "/malay-woman-hijab.jpg",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    content:
      "Made tempeh rendang for dinner tonight! My family couldn't tell the difference from the traditional version. Recipe coming soon! 🌶️",
    image: "/tempeh-rendang-with-rice-and-vegetables.jpg",
    likes: 67,
    comments: 31,
    isLiked: true,
  },
]

export default function CommunityPage() {
  const { posts: userPosts, toggleLike } = useAppStore()

  const [localFriendPosts, setLocalFriendPosts] = useState(friendPosts)
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({})
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({})
  const [postComments, setPostComments] = useState<{ [key: string]: Array<{ author: string; text: string }> }>({})

  const allPosts = [...userPosts, ...localFriendPosts].sort((a, b) => {
    const timeA = typeof a.timestamp === "string" ? new Date(a.timestamp).getTime() : a.timestamp.getTime()
    const timeB = typeof b.timestamp === "string" ? new Date(b.timestamp).getTime() : b.timestamp.getTime()
    return timeB - timeA
  })

  const handleLike = (postId: string) => {
    console.log("[v0] Toggling like for post:", postId)

    // Check if it's a user post (from store)
    const isUserPost = userPosts.some((p) => p.id === postId)

    if (isUserPost) {
      console.log("[v0] User post found, using store toggleLike")
      toggleLike(postId)
    } else {
      // It's a friend post (local state)
      console.log("[v0] Friend post found, updating local state")
      setLocalFriendPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              }
            : post,
        ),
      )
    }
  }

  const handleCommentSubmit = (postId: string) => {
    const commentText = commentInputs[postId]
    if (!commentText?.trim()) return

    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { author: "You", text: commentText }],
    }))

    // Update comment count for friend posts only (user posts don't track comment count in store)
    const isFriendPost = localFriendPosts.some((p) => p.id === postId)
    if (isFriendPost) {
      setLocalFriendPosts((prev) =>
        prev.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)),
      )
    }

    // Clear input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
  }

  const toggleCommentsView = (postId: string) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container-responsive py-8 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Friends Feed</h1>
            <p className="text-muted-foreground text-lg">See what your friends are eating</p>
          </div>

          <div className="space-y-6">
            {allPosts.length === 0 ? (
              <Card className="glass-effect glass-effect-dark shadow-lg border-border/20">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No posts yet. Share your first meal from the Scan page!</p>
                </CardContent>
              </Card>
            ) : (
              allPosts.map((post) => (
                <Card key={post.id} className="glass-effect glass-effect-dark shadow-lg border-border/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.avatar || "/placeholder.svg?height=48&width=48&query=user avatar"}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.timestamp).toLocaleDateString("en-SG", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground leading-relaxed">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg?height=400&width=600&query=food"}
                        alt="Post"
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 hover:bg-accent/50"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors ${
                            post.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-medium">{post.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 hover:bg-accent/50"
                        onClick={() => toggleCommentsView(post.id)}
                      >
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{post.comments + (postComments[post.id]?.length || 0)}</span>
                      </Button>

                      <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                        <Share className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>

                    {showComments[post.id] && (
                      <div className="space-y-3 pt-4 border-t border-border/50">
                        {postComments[post.id]?.map((comment, idx) => (
                          <div key={idx} className="flex items-start space-x-3 bg-accent/30 p-3 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">{comment.author[0]}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                              <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                          </div>
                        ))}

                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Write a comment..."
                            value={commentInputs[post.id] || ""}
                            onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleCommentSubmit(post.id)
                              }
                            }}
                            className="flex-1 bg-background/50 border-border/50"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleCommentSubmit(post.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
