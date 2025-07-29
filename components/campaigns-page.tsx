"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
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
import { Plus, Play, Pause, Edit, Eye, Target, DollarSign, Users, MousePointer, Filter, ChevronDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function CampaignsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const [isLive, setIsLive] = useState(false)
  const [updateInterval, setUpdateInterval] = useState<number | null>(null)

  const liveUpdate = useCallback(() => {
    setData(generateCampaignsData())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setData(generateCampaignsData())
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
    if (!data?.campaigns?.length) {
      toast({
        title: "No data to export",
        description: "There is no campaigns data available to export.",
        variant: "destructive",
      })
      return
    }

    const header = Object.keys(data.campaigns[0]).join(",")
    const csvContent = data.campaigns
      .map((row: any) => Object.values(row).join(","))
      .join("\n")

    const blob = new Blob([`${header}\n${csvContent}`], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "campaigns.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "Campaigns data has been exported to CSV.",
    })
  }, [data, toast])

  const handleCreateCampaign = () => {
    setIsCreateDialogOpen(false)
    toast({
      title: "Campaign created",
      description: "Your new campaign has been created successfully.",
    })
  }

  const handleCampaignAction = (action: string, campaignName: string) => {
    toast({
      title: `Campaign ${action}`,
      description: `${campaignName} has been ${action.toLowerCase()}.`,
    })
  }

  if (loading) {
    return <CampaignsSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">Create, manage, and optimize your marketing campaigns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={exportData}>
            Export
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Set up a new marketing campaign with your target audience and budget.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Campaign Name
                  </Label>
                  <Input id="name" placeholder="Enter campaign name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Campaign Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="traffic">Traffic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">
                    Budget
                  </Label>
                  <Input id="budget" type="number" placeholder="0" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" placeholder="Campaign description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateCampaign}>
                  Create Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.7% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgCTR}%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="creative">Creative Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
                    <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.budgetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.budgetAllocation.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Campaign List */}
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.campaigns.map((campaign: any) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.type}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "paused"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                      <TableCell>${campaign.spent.toLocaleString()}</TableCell>
                      <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                      <TableCell>{campaign.ctr}%</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedCampaign(campaign)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCampaignAction("Edit", campaign.name)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleCampaignAction(campaign.status === "active" ? "Paused" : "Started", campaign.name)
                            }
                          >
                            {campaign.status === "active" ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ctr" stroke="#8884d8" name="CTR %" />
                    <Line type="monotone" dataKey="conversions" stroke="#82ca9d" name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topPerformers.map((campaign: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">ROI: {campaign.roi}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${campaign.revenue.toLocaleString()}</p>
                        <Progress value={campaign.performance} className="w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.audienceDemographics.map((demo: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{demo.segment}</span>
                        <span>{demo.percentage}%</span>
                      </div>
                      <Progress value={demo.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.geographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="audience" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.deviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.deviceBreakdown.map((entry: any, index: number) => (
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

        <TabsContent value="creative" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Creative Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.creativeAssets.map((asset: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <span className="text-muted-foreground">{asset.type}</span>
                    </div>
                    <h3 className="font-medium mb-2">{asset.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-medium">{asset.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-medium">{asset.ctr}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Performance</span>
                        <span>{asset.performance}%</span>
                      </div>
                      <Progress value={asset.performance} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedCampaign.name}</DialogTitle>
              <DialogDescription>Detailed campaign analytics and performance metrics</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">${selectedCampaign.spent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedCampaign.impressions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedCampaign.clicks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedCampaign.ctr}%</p>
                  <p className="text-xs text-muted-foreground">CTR</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Progress</span>
                  <span>
                    ${selectedCampaign.spent.toLocaleString()} / ${selectedCampaign.budget.toLocaleString()}
                  </span>
                </div>
                <Progress value={(selectedCampaign.spent / selectedCampaign.budget) * 100} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                Close
              </Button>
              <Button onClick={() => handleCampaignAction("Edit", selectedCampaign.name)}>Edit Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function CampaignsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 loading-skeleton rounded" />
          <div className="h-4 w-48 loading-skeleton rounded" />
        </div>
        <div className="flex space-x-2">
          <div className="h-9 w-24 loading-skeleton rounded" />
          <div className="h-9 w-32 loading-skeleton rounded" />
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

function generateCampaignsData() {
  return {
    activeCampaigns: Math.floor(Math.random() * 5) + 12,
    totalSpend: Math.floor(Math.random() * 20000) + 85000,
    totalReach: Math.floor(Math.random() * 100000) + 450000,
    avgCTR: (Math.random() * 2 + 2.5).toFixed(1),
    campaignPerformance: [
      { name: "Summer Sale", impressions: 125000, clicks: 3200 },
      { name: "Brand Awareness", impressions: 98000, clicks: 2100 },
      { name: "Product Launch", impressions: 156000, clicks: 4800 },
      { name: "Holiday Special", impressions: 87000, clicks: 1950 },
    ],
    budgetAllocation: [
      { name: "Google Ads", value: 35 },
      { name: "Facebook", value: 28 },
      { name: "Instagram", value: 20 },
      { name: "LinkedIn", value: 12 },
      { name: "Other", value: 5 },
    ],
    campaigns: [
      {
        id: 1,
        name: "Summer Sale2025",
        type: "Conversion",
        status: "active",
        budget: 25000,
        spent: 18500,
        impressions: 125000,
        clicks: 3200,
        ctr: 2.56,
      },
      {
        id: 2,
        name: "Brand Awareness Q3",
        type: "Awareness",
        status: "active",
        budget: 15000,
        spent: 12800,
        impressions: 98000,
        clicks: 2100,
        ctr: 2.14,
      },
      {
        id: 3,
        name: "Product Launch",
        type: "Traffic",
        status: "paused",
        budget: 30000,
        spent: 22000,
        impressions: 156000,
        clicks: 4800,
        ctr: 3.08,
      },
      {
        id: 4,
        name: "Holiday Special",
        type: "Engagement",
        status: "completed",
        budget: 20000,
        spent: 19500,
        impressions: 87000,
        clicks: 1950,
        ctr: 2.24,
      },
    ],
    performanceTrends: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      ctr: Math.random() * 2 + 2,
      conversions: Math.floor(Math.random() * 50) + 20,
    })),
    topPerformers: [
      { name: "Summer Sale2025", roi: 285, revenue: 125000, performance: 95 },
      { name: "Product Launch", roi: 220, revenue: 98000, performance: 88 },
      { name: "Brand Awareness Q3", roi: 180, revenue: 67000, performance: 75 },
    ],
    audienceDemographics: [
      { segment: "18-24", percentage: 22 },
      { segment: "25-34", percentage: 35 },
      { segment: "35-44", percentage: 28 },
      { segment: "45-54", percentage: 12 },
      { segment: "55+", percentage: 3 },
    ],
    geographicData: [
      { location: "US", audience: 45000 },
      { location: "UK", audience: 28000 },
      { location: "CA", audience: 18000 },
      { location: "AU", audience: 12000 },
      { location: "DE", audience: 8000 },
    ],
    deviceBreakdown: [
      { name: "Mobile", value: 52 },
      { name: "Desktop", value: 35 },
      { name: "Tablet", value: 13 },
    ],
    creativeAssets: [
      { name: "Hero Banner", type: "Image", impressions: 85000, ctr: 3.2, performance: 92 },
      { name: "Product Video", type: "Video", impressions: 125000, ctr: 4.1, performance: 88 },
      { name: "Carousel Ad", type: "Image", impressions: 67000, ctr: 2.8, performance: 75 },
      { name: "Story Ad", type: "Video", impressions: 45000, ctr: 3.5, performance: 82 },
      { name: "Display Banner", type: "Image", impressions: 92000, ctr: 2.1, performance: 68 },
      { name: "Interactive Ad", type: "Interactive", impressions: 38000, ctr: 5.2, performance: 95 },
    ],
  }
}
