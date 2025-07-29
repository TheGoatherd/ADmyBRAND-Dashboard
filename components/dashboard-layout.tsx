"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className={cn("transition-all duration-300 ease-in-out", "lg:ml-64")}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}
