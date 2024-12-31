import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Welcome to IP - Inventory Prototype</h1>
          <p className="text-xl text-muted-foreground">A modern, efficient, and user-friendly inventory management system</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>Core functionalities of our system</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  'Real-time inventory tracking',
                  'Stock movement management',
                  'Supplier management',
                  'Role-based access control',
                  'Barcode scanning support',
                  'Dark/Light theme support'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Access levels and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Admin</h3>
                  <p className="text-sm text-muted-foreground">Full access to all features, user management, and system configuration</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manager</h3>
                  <p className="text-sm text-muted-foreground">Access to inventory management, reports, and supplier management</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Warehouse</h3>
                  <p className="text-sm text-muted-foreground">Basic inventory operations, stock movements, and barcode scanning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demo Credentials</CardTitle>
              <CardDescription>Test accounts for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Admin Access</h3>
                  <p className="text-sm">Username: admin</p>
                  <p className="text-sm text-muted-foreground">Password: admin123</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manager Access</h3>
                  <p className="text-sm">Username: manager</p>
                  <p className="text-sm text-muted-foreground">Password: manager123</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Warehouse Access</h3>
                  <p className="text-sm">Username: warehouse</p>
                  <p className="text-sm text-muted-foreground">Password: warehouse123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/documentation">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
