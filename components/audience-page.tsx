"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Users, UserPlus, UserMinus, Heart, MessageCircle, Share2, Calendar, MapPin, Clock, ChevronDown } from "lucide-react"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function AudiencePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [isLive, setIsLive] = useState(false)
  const [updateInterval, setUpdateInterval] = useState<number | null>(null)
  const { toast } = useToast()

  const liveUpdate = useCallback(() => {
    setData(generateAudienceData())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setData(generateAudienceData())
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isLive && updateInterval) {
      intervalId = setInterval(liveUpdate, updateInterval)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isLive, updateInterval, liveUpdate])

  const exportData = useCallback(() => {
    if (!data?.audienceSegments?.length) {
      toast({
        title: "No data to export",
        description: "There is no audience segments data available to export.",
        variant: "destructive",
      })
      return
    }

    const header = Object.keys(data.audienceSegments[0]).join(",")
    const csvContent = data.audienceSegments
      .map((row: any) => Object.values(row).join(","))
      .join("\n")

    const blob = new Blob([`${header}\n${csvContent}`], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "audience-segments.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Audience segments data has been exported to CSV.",
    })
  }, [data, toast])

  if (loading) {
    return <AudienceSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audience Insights</h1>
          <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Create Segment</Button>
          <Button onClick={exportData}>Export Audience</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={isLive ? "secondary" : "outline"} size="sm" className="w-[120px]">
                {isLive ? "Live: On" : "Live: Off"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Update Intensity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsLive(true)
                  setUpdateInterval(1000)
                }}
              >
                High (1s)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsLive(true)
                  setUpdateInterval(5000)
                }}
              >
                Low (5s)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsLive(false)
                  setUpdateInterval(null)
                }}
              >
                Off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Audience Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audience</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalAudience.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.newUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returning Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.returningUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.7% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.churnRate}%</div>
            <p className="text-xs text-muted-foreground">-1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Audience Analytics */}
      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Split</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.genderSplit}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.genderSplit.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.incomeDistribution.map((income: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{income.range}</span>
                        <span>{income.percentage}%</span>
                      </div>
                      <Progress value={income.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topInterests.map((interest: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{interest.name}</span>
                      </div>
                      <Badge variant="secondary">{interest.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interest Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.interestTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="technology" stroke="#8884d8" />
                    <Line type="monotone" dataKey="fashion" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="travel" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Comments per post</span>
                    </div>
                    <span className="text-sm font-medium">{data.avgComments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Likes per post</span>
                    </div>
                    <span className="text-sm font-medium">{data.avgLikes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Shares per post</span>
                    </div>
                    <span className="text-sm font-medium">{data.avgShares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.activityTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activity" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.audienceSegments.map((segment: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{segment.name}</h3>
                        <Badge variant="outline">{segment.size.toLocaleString()} users</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Avg age: {segment.avgAge}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>Top location: {segment.topLocation}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Engagement: {segment.engagement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentActivity.map((activity: any, index: number) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{activity.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AudienceSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 loading-skeleton rounded" />
          <div className="h-4 w-48 loading-skeleton rounded" />
        </div>
        <div className="flex space-x-2">
          <div className="h-9 w-32 loading-skeleton rounded" />
          <div className="h-9 w-24 loading-skeleton rounded" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 loading-skeleton rounded-lg" />
        ))}
      </div>

      <div className="h-96 loading-skeleton rounded-lg" />
    </div>
  )
}

function generateAudienceData() {
  return {
    totalAudience: Math.floor(Math.random() * 10000) + 85000,
    newUsers: Math.floor(Math.random() * 2000) + 8500,
    returningUsers: Math.floor(Math.random() * 5000) + 25000,
    churnRate: Math.floor(Math.random() * 5) + 12,
    ageDistribution: [
      { age: "18-24", percentage: 18 },
      { age: "25-34", percentage: 32 },
      { age: "35-44", percentage: 25 },
      { age: "45-54", percentage: 15 },
      { age: "55+", percentage: 10 },
    ],
    genderSplit: [
      { name: "Female", value: 52 },
      { name: "Male", value: 45 },
      { name: "Other", value: 3 },
    ],
    incomeDistribution: [
      { range: "$0-25k", percentage: 15 },
      { range: "$25k-50k", percentage: 28 },
      { range: "$50k-75k", percentage: 25 },
      { range: "$75k-100k", percentage: 20 },
      { range: "$100k+", percentage: 12 },
    ],
    topInterests: [
      { name: "Technology", percentage: 45 },
      { name: "Fashion", percentage: 38 },
      { name: "Travel", percentage: 32 },
      { name: "Food", percentage: 28 },
      { name: "Fitness", percentage: 25 },
    ],
    interestTrends: Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      technology: Math.floor(Math.random() * 20) + 40,
      fashion: Math.floor(Math.random() * 15) + 30,
      travel: Math.floor(Math.random() * 10) + 25,
    })),
    avgComments: Math.floor(Math.random() * 10) + 15,
    avgLikes: Math.floor(Math.random() * 50) + 120,
    avgShares: Math.floor(Math.random() * 5) + 8,
    activityTimeline: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      activity: Math.floor(Math.random() * 1000) + 200,
    })),
    audienceSegments: [
      {
        name: "Tech Enthusiasts",
        size: 15420,
        description: "Users interested in latest technology trends and gadgets",
        avgAge: 28,
        topLocation: "San Francisco",
        engagement: "High",
      },
      {
        name: "Fashion Forward",
        size: 12850,
        description: "Style-conscious users who follow fashion trends",
        avgAge: 25,
        topLocation: "New York",
        engagement: "Very High",
      },
      {
        name: "Travel Lovers",
        size: 9630,
        description: "Adventure seekers and travel enthusiasts",
        avgAge: 32,
        topLocation: "Los Angeles",
        engagement: "Medium",
      },
    ],
    recentActivity: [
      {
        user: "Sarah Johnson",
        action: "Liked your post about summer trends",
        time: "2 minutes ago",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      {
        user: "Mike Chen",
        action: "Shared your campaign with their network",
        time: "5 minutes ago",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      {
        user: "Emma Davis",
        action: "Commented on your latest product launch",
        time: "12 minutes ago",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
    ],
  }
}
