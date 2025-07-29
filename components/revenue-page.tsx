"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ShoppingCart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function RevenuePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [isLive, setIsLive] = useState(false)
  const [updateInterval, setUpdateInterval] = useState<number | null>(null)
  const { toast } = useToast()

  const liveUpdate = useCallback(() => {
    setData(generateRevenueData())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setData(generateRevenueData())
      setLoading(false)
    }, 1000)
    // Removed the interval that was causing automatic data updates every 25 seconds
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
    if (!data?.revenueTrend?.length) {
      toast({
        title: "No data to export",
        description: "There is no revenue trend data available to export.",
        variant: "destructive",
      })
      return
    }

    const header = Object.keys(data.revenueTrend[0]).join(",")
    const csvContent = data.revenueTrend
      .map((row: any) => Object.values(row).join(","))
      .join("\n")

    const blob = new Blob([`${header}\n${csvContent}`], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "revenue-trend.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Revenue trend data has been exported to CSV.",
    })
  }, [data, toast])

  if (loading) {
    return <RevenueSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track your financial performance and growth</p>
        </div>
        <div className="flex space-x-2">
          <DateRangePicker />
          <Button variant="outline">Generate Report</Button>
          <Button onClick={exportData}>Export Data</Button>
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

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.2%</span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.mrr.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.7%</span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.aov}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-2.3%</span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+1.8%</span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="channels">Sales Channels</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={data.revenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data.revenueVsTarget}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="actual" fill="#8884d8" name="Actual Revenue" />
                    <Bar dataKey="target" fill="#82ca9d" name="Target Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topRevenueSources.map((source: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground">${source.revenue.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{source.percentage}%</Badge>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          {source.change > 0 ? (
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span className={source.change > 0 ? "text-green-500" : "text-red-500"}>
                            {Math.abs(source.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Revenue Goal</span>
                      <span>
                        ${data.monthlyGoal.revenue.toLocaleString()} / ${data.monthlyGoal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(data.monthlyGoal.revenue / data.monthlyGoal.target) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>New Customers</span>
                      <span>
                        {data.monthlyGoal.customers} / {data.monthlyGoal.customerTarget}
                      </span>
                    </div>
                    <Progress value={(data.monthlyGoal.customers / data.monthlyGoal.customerTarget) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Conversion Rate</span>
                      <span>
                        {data.monthlyGoal.conversion}% / {data.monthlyGoal.conversionTarget}%
                      </span>
                    </div>
                    <Progress value={(data.monthlyGoal.conversion / data.monthlyGoal.conversionTarget) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.revenueBreakdown.map((entry: any, index: number) => (
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

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.productPerformance.map((product: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <Badge variant={product.trend === "up" ? "default" : "destructive"}>
                        {product.trend === "up" ? "↗" : "↘"} {product.change}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${product.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Units Sold</p>
                        <p className="font-medium">{product.units.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Price</p>
                        <p className="font-medium">${product.avgPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Margin</p>
                        <p className="font-medium">{product.margin}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data.salesChannels}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.channelGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="online" stroke="#8884d8" name="Online" />
                    <Line type="monotone" dataKey="retail" stroke="#82ca9d" name="Retail" />
                    <Line type="monotone" dataKey="wholesale" stroke="#ffc658" name="Wholesale" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.revenueForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Revenue" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#82ca9d"
                    strokeDasharray="5 5"
                    name="Forecasted Revenue"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RevenueSkeleton() {
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

function generateRevenueData() {
  return {
    totalRevenue: Math.floor(Math.random() * 50000) + 450000,
    mrr: Math.floor(Math.random() * 10000) + 85000,
    aov: Math.floor(Math.random() * 50) + 125,
    conversionRate: (Math.random() * 2 + 3).toFixed(1),
    revenueTrend: Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      revenue: Math.floor(Math.random() * 50000) + 350000,
    })),
    revenueVsTarget: Array.from({ length: 6 }, (_, i) => ({
      month: `Month ${i + 1}`,
      actual: Math.floor(Math.random() * 50000) + 350000,
      target: Math.floor(Math.random() * 30000) + 380000,
    })),
    topRevenueSources: [
      { name: "E-commerce", revenue: 285000, percentage: 45, change: 12.5 },
      { name: "Subscriptions", revenue: 190000, percentage: 30, change: 8.2 },
      { name: "Partnerships", revenue: 95000, percentage: 15, change: -2.1 },
      { name: "Advertising", revenue: 63000, percentage: 10, change: 15.7 },
    ],
    monthlyGoal: {
      revenue: 425000,
      target: 500000,
      customers: 1250,
      customerTarget: 1500,
      conversion: 4.2,
      conversionTarget: 5.0,
    },
    revenueBreakdown: [
      { name: "Products", value: 60 },
      { name: "Services", value: 25 },
      { name: "Subscriptions", value: 10 },
      { name: "Other", value: 5 },
    ],
    productPerformance: [
      {
        name: "Premium Plan",
        revenue: 125000,
        units: 850,
        avgPrice: 147,
        margin: 75,
        trend: "up",
        change: 12.5,
      },
      {
        name: "Basic Plan",
        revenue: 95000,
        units: 1200,
        avgPrice: 79,
        margin: 65,
        trend: "up",
        change: 8.3,
      },
      {
        name: "Enterprise Plan",
        revenue: 180000,
        units: 120,
        avgPrice: 1500,
        margin: 85,
        trend: "down",
        change: -3.2,
      },
    ],
    salesChannels: [
      { channel: "Online", revenue: 285000 },
      { channel: "Retail", revenue: 150000 },
      { channel: "Wholesale", revenue: 95000 },
      { channel: "Mobile App", revenue: 120000 },
    ],
    channelGrowth: Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      online: Math.floor(Math.random() * 50000) + 200000,
      retail: Math.floor(Math.random() * 30000) + 100000,
      wholesale: Math.floor(Math.random() * 20000) + 60000,
    })),
    revenueForecast: Array.from({ length: 18 }, (_, i) => ({
      month: `Month ${i + 1}`,
      actual: i < 12 ? Math.floor(Math.random() * 50000) + 350000 : null,
      forecast: i >= 10 ? Math.floor(Math.random() * 60000) + 380000 : null,
    })),
  }
}
