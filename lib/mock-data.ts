export interface AnalyticsData {
  metrics: {
    revenue: number
    revenueChange: number
    users: number
    usersChange: number
    conversions: number
    conversionsChange: number
    growth: number
    growthChange: number
  }
  chartData: {
    revenue: Array<{ month: string; value: number }>
    users: Array<{ month: string; value: number }>
    channels: Array<{ name: string; value: number }>
  }
  tableData: Array<{
    id: string
    campaign: string
    channel: string
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    ctr: number
    status: "active" | "paused" | "completed"
    date: string
  }>
}

const campaigns = [
  "Summer Sale2025",
  "Black Friday Deals",
  "New Product Launch",
  "Brand Awareness",
  "Holiday Special",
  "Back to School",
  "Spring Collection",
  "Customer Retention",
  "Lead Generation",
  "Mobile App Promotion",
  "Email Campaign",
  "Social Media Boost",
  "Retargeting Campaign",
  "Video Marketing",
  "Influencer Partnership",
  "Local Marketing",
  "B2B Outreach",
  "Content Marketing",
  "SEO Campaign",
  "PPC Optimization",
]

const channels = ["Google Ads", "Facebook", "Instagram", "LinkedIn", "Twitter"]
const statuses: Array<"active" | "paused" | "completed"> = ["active", "paused", "completed"]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFloat(min: number, max: number, decimals = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals))
}

export function generateMockData(): AnalyticsData {
  // Generate metrics with realistic variations
  const baseRevenue = 125000
  const baseUsers = 45000
  const baseConversions = 2800
  const baseGrowth = 12.5

  const metrics = {
    revenue: baseRevenue + getRandomNumber(-5000, 15000),
    revenueChange: getRandomFloat(-5, 25),
    users: baseUsers + getRandomNumber(-2000, 8000),
    usersChange: getRandomFloat(-8, 18),
    conversions: baseConversions + getRandomNumber(-200, 600),
    conversionsChange: getRandomFloat(-10, 20),
    growth: baseGrowth + getRandomFloat(-2, 5),
    growthChange: getRandomFloat(-3, 8),
  }

  // Generate chart data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const chartData = {
    revenue: months.map((month) => ({
      month,
      value: getRandomNumber(80000, 150000),
    })),
    users: months.map((month) => ({
      month,
      value: getRandomNumber(30000, 60000),
    })),
    channels: [
      { name: "Google Ads", value: getRandomNumber(25, 35) },
      { name: "Facebook", value: getRandomNumber(20, 30) },
      { name: "Instagram", value: getRandomNumber(15, 25) },
      { name: "LinkedIn", value: getRandomNumber(10, 20) },
      { name: "Twitter", value: getRandomNumber(5, 15) },
    ],
  }

  // Generate table data (100+ rows as requested)
  const tableData = Array.from({ length: 120 }, (_, index) => {
    const impressions = getRandomNumber(10000, 500000)
    const clicks = getRandomNumber(100, impressions * 0.1)
    const conversions = getRandomNumber(5, clicks * 0.2)
    const ctr = (clicks / impressions) * 100

    return {
      id: `campaign-${index + 1}`,
      campaign: getRandomElement(campaigns),
      channel: getRandomElement(channels),
      impressions,
      clicks,
      conversions,
      revenue: getRandomNumber(500, 25000),
      ctr: Number(ctr.toFixed(2)),
      status: getRandomElement(statuses),
      date: new Date(2024, getRandomNumber(0, 11), getRandomNumber(1, 28)).toISOString().split("T")[0],
    }
  })

  return {
    metrics,
    chartData,
    tableData,
  }
}
