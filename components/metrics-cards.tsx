"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AnalyticsData } from "@/lib/mock-data"

interface MetricsCardsProps {
  data: AnalyticsData | null
  loading: boolean
}

export function MetricsCards({ data, loading }: MetricsCardsProps) {
  const metrics = [
    {
      title: "Revenue from Ads",
      value: data?.metrics.revenue || 0,
      change: data?.metrics.revenueChange || 0,
      icon: DollarSign,
      format: "currency",
    },
    {
      title: "Reach",
      value: data?.metrics.users || 0,
      change: data?.metrics.usersChange || 0,
      icon: Users,
      format: "number",
    },
    {
      title: "Conversions",
      value: data?.metrics.conversions || 0,
      change: data?.metrics.conversionsChange || 0,
      icon: Target,
      format: "number",
    },
    {
      title: "Campaign Growth",
      value: data?.metrics.growth || 0,
      change: data?.metrics.growthChange || 0,
      icon: BarChart3,
      format: "percentage",
    },
  ]

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
      case "percentage":
        return `${value.toFixed(1)}%`
      default:
        return new Intl.NumberFormat("en-US").format(value)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 bg-muted rounded mb-2" />
              <div className="h-4 w-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositive = metric.change > 0
        const isNegative = metric.change < 0

        return (
          <Card
            key={metric.title}
            className="animate-slide-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{formatValue(metric.value, metric.format)}</div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={isPositive ? "default" : isNegative ? "destructive" : "secondary"}
                  className={cn(
                    "text-xs",
                    isPositive && "bg-green-100 text-green-700 hover:bg-green-100",
                    isNegative && "bg-red-100 text-red-700 hover:bg-red-100",
                  )}
                >
                  {isPositive && <TrendingUp className="h-3 w-3 mr-1" />}
                  {isNegative && <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(metric.change).toFixed(1)}%
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
