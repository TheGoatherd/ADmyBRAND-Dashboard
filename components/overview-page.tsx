"use client"

import { useState, useEffect } from "react"
import { MetricsCards } from "@/components/metrics-cards"
import { ChartsSection } from "@/components/charts-section"
import { DataTable } from "@/components/data-table"
import { DateRangePicker } from "@/components/date-range-picker"
import { generateMockData, type AnalyticsData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function OverviewPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const { toast } = useToast()

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateMockData())
      setLastUpdated(new Date())
      setLoading(false)
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated successfully.",
      })
    }, 1000)
  }

  useEffect(() => {
    // Initial data load
    refreshData()
  }, [])

  const exportData = () => {
    if (!data) return

    const csvContent = data.tableData.map((row) => Object.values(row).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "analytics-data.csv"
    a.click()

    toast({
      title: "Export successful",
      description: "Analytics data has been exported to CSV.",
    })
  }

  if (loading && !data) {
    return <OverviewSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Dashboard</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <DateRangePicker />
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards data={data} loading={loading} />

      {/* Charts Section */}
      <ChartsSection data={data} loading={loading} />

      {/* Data Table */}
      <DataTable data={data?.tableData || []} loading={loading} />
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 loading-skeleton rounded" />
          <div className="h-4 w-48 loading-skeleton rounded" />
        </div>
        <div className="flex space-x-2">
          <div className="h-9 w-24 loading-skeleton rounded" />
          <div className="h-9 w-24 loading-skeleton rounded" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 loading-skeleton rounded-lg" />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-80 loading-skeleton rounded-lg" />
        <div className="h-80 loading-skeleton rounded-lg" />
      </div>

      <div className="h-96 loading-skeleton rounded-lg" />
    </div>
  )
}
