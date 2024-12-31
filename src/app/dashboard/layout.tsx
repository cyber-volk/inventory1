"use client"

import { useAuth } from "@/components/auth-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-64 flex-none">
          <AppSidebar />
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto h-full p-6 max-w-none">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
