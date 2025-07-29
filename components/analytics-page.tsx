"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DateRangePicker } from "@/components/date-range-picker"
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Clock,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ChevronDown,
} from "lucide-react"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [isLive, setIsLive] = useState(false)
  const [updateInterval, setUpdateInterval] = useState<number | null>(null)
  const { toast } = useToast()

  const liveUpdate = useCallback(() => {
    setData(generateAnalyticsData())
  }, [])

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(generateAnalyticsData())
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
    if (!data?.trafficTrends?.length) {
      toast({
        title: "No data to export",
        description: "There is no traffic trends data available to export.",
        variant: "destructive",
      })
      return
    }

    const header = Object.keys(data.trafficTrends[0]).join(",")
    const csvContent = data.trafficTrends
      .map((row: any) => Object.values(row).join(","))
      .join("\n")

    const blob = new Blob([`${header}\n${csvContent}`], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "analytics-traffic-trends.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Traffic trends data has been exported to CSV.",
    })
  }, [data, toast])

  if (loading) {
    return <AnalyticsSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Campaign Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your advertising performance and ROI</p>
        </div>
        <div className="flex space-x-2">
          <DateRangePicker />
          <Button variant="outline" onClick={exportData}>
            Export Report
          </Button>
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

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgSessionDuration}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-2.1%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.bounceRate}%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">-5.3%</span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="devices">Device Analytics</TabsTrigger>
          <TabsTrigger value="geography">Geographic Data</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.trafficTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.trafficSources.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topPages.map((page: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{page.path}</p>
                        <p className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                      <Progress value={page.percentage} className="w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.userFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">45.2%</p>
                      <p className="text-xs text-muted-foreground">18,450 users</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">38.7%</p>
                      <p className="text-xs text-muted-foreground">15,780 users</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tablet className="h-4 w-4" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">16.1%</p>
                      <p className="text-xs text-muted-foreground">6,570 users</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Browser Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.browserData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="browser" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topCountries.map((country: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">{country.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{country.percentage}%</p>
                        <p className="text-xs text-muted-foreground">{country.users.toLocaleString()} users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AnalyticsSkeleton() {
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

function generateAnalyticsData() {
  return {
    pageViews: Math.floor(Math.random() * 50000) + 150000,
    uniqueVisitors: Math.floor(Math.random() * 20000) + 45000,
    avgSessionDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    bounceRate: Math.floor(Math.random() * 20) + 35,
    trafficTrends: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      visitors: Math.floor(Math.random() * 2000) + 1000,
      pageViews: Math.floor(Math.random() * 5000) + 2000,
    })),
    trafficSources: [
      { name: "Organic Search", value: 35 },
      { name: "Direct", value: 25 },
      { name: "Social Media", value: 20 },
      { name: "Referral", value: 12 },
      { name: "Email", value: 8 },
    ],
    topPages: [
      { path: "/", views: 45000, percentage: 100 },
      { path: "/products", views: 32000, percentage: 71 },
      { path: "/about", views: 18000, percentage: 40 },
      { path: "/contact", views: 12000, percentage: 27 },
      { path: "/blog", views: 8500, percentage: 19 },
    ],
    userFlow: [
      { step: "Landing", users: 10000 },
      { step: "Product View", users: 7500 },
      { step: "Add to Cart", users: 3200 },
      { step: "Checkout", users: 1800 },
      { step: "Purchase", users: 1200 },
    ],
    browserData: [
      { browser: "Chrome", users: 25000 },
      { browser: "Safari", users: 12000 },
      { browser: "Firefox", users: 8000 },
      { browser: "Edge", users: 5000 },
      { browser: "Other", users: 3000 },
    ],
    topCountries: [
      { name: "United States", percentage: 35.2, users: 15800 },
      { name: "United Kingdom", percentage: 18.7, users: 8400 },
      { name: "Canada", percentage: 12.3, users: 5500 },
      { name: "Australia", percentage: 8.9, users: 4000 },
      { name: "Germany", percentage: 7.1, users: 3200 },
    ],
    regionalData: [
      { region: "North America", revenue: 125000 },
      { region: "Europe", revenue: 98000 },
      { region: "Asia Pacific", revenue: 67000 },
      { region: "Latin America", revenue: 34000 },
      { region: "Africa", revenue: 18000 },
    ],
  }
}
