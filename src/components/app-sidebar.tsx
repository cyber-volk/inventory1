"use client"

import { Home, Package, Users, TrendingUp, BarChart2, Settings, LogOut, FileText } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from "@/components/auth-provider"
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', roles: ["admin", "manager", "warehouse"] },
  { icon: Package, label: 'Inventory', href: '/inventory', roles: ["admin", "manager", "warehouse"] },
  { icon: Users, label: 'Suppliers', href: '/suppliers', roles: ["admin", "manager"] },
  { icon: TrendingUp, label: 'Stock Movements', href: '/stock-movements', roles: ["admin", "manager", "warehouse"] },
  { icon: BarChart2, label: 'Reports', href: '/reports', roles: ["admin", "manager"] },
  { icon: FileText, label: 'Invoices', href: '/billing/invoices', roles: ["admin", "manager"] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ["admin"] },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">Inventory App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                item.roles.includes(user.role) && (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href} className="flex items-center px-4 py-2 w-full">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="flex items-center px-4 py-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}

