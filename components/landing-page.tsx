"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  ArrowRight,
  Star,
  Activity,
  Calendar,
  DollarSign,
  Eye,
  MousePointer,
  PieChart
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights into your advertising campaigns with real-time data visualization and performance tracking."
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "Create, manage, and optimize your advertising campaigns across multiple platforms from a single dashboard."
  },
  {
    icon: Users,
    title: "Audience Insights",
    description: "Deep dive into your audience demographics, behavior patterns, and engagement metrics to maximize ROI."
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "AI-powered recommendations and automated bid management to improve campaign performance and reduce costs."
  },
  {
    icon: Eye,
    title: "Brand Monitoring",
    description: "Track brand mentions, sentiment analysis, and competitive intelligence across all digital channels."
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Advanced fraud detection and prevention to protect your ad spend from invalid clicks and impressions."
  }
]

const stats = [
  {
    icon: Target,
    value: "10K+",
    label: "Active Campaigns"
  },
  {
    icon: Users,
    value: "500M+",
    label: "Impressions Served"
  },
  {
    icon: DollarSign,
    value: "$2.5B+",
    label: "Ad Spend Managed"
  },
  {
    icon: TrendingUp,
    value: "35%",
    label: "Average ROI Increase"
  }
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ADmyBRAND</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild>
              <Link href="/dashboard">
                Access Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powered by AI-Driven Insights
            </Badge>
            
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Transform Your Advertising with
                <span className="text-primary"> Smart Analytics</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unlock the power of data-driven marketing insights to optimize campaigns, maximize ROI, 
                and scale your advertising efforts across all platforms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <stat.icon className="h-8 w-8 text-primary mb-2" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              Features
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to dominate digital advertising
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From campaign optimization to audience insights, our comprehensive suite of tools 
              helps you make data-driven decisions and maximize your advertising performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              Process
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              How ADmyBRAND Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MousePointer className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">1. Connect Your Campaigns</h3>
              <p className="text-muted-foreground">
                Integrate with all major advertising platforms including Google Ads, Facebook, Instagram, and more.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">2. Analyze Performance</h3>
              <p className="text-muted-foreground">
                Get real-time insights into campaign performance, audience behavior, and conversion metrics.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">3. Optimize & Scale</h3>
              <p className="text-muted-foreground">
                Use AI-powered recommendations to optimize campaigns and scale your successful strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to revolutionize your advertising?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of marketers already using ADmyBRAND to drive growth and maximize their advertising ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded bg-primary flex items-center justify-center">
                <Activity className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">ADmyBRAND</span>
            </div>
            <div className="text-sm text-muted-foreground">
              ©2025 ADmyBRAND. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 