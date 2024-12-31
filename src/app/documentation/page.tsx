"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MermaidDiagram } from "@/components/mermaid-diagram"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">System Documentation</h1>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Database Schema Class Diagram</CardTitle>
            <CardDescription>Entity relationships and data structure</CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={`
              classDiagram
                class User {
                  +String id
                  +String username
                  +String password
                  +String role
                  +DateTime createdAt
                  +login()
                  +logout()
                }

                class Item {
                  +String id
                  +String name
                  +String description
                  +Number quantity
                  +String location
                  +String barcode
                  +DateTime createdAt
                  +DateTime updatedAt
                  +updateQuantity()
                }

                class StockMovement {
                  +String id
                  +String type
                  +Number quantity
                  +DateTime timestamp
                  +String notes
                  +recordMovement()
                }

                class Supplier {
                  +String id
                  +String name
                  +String contact
                  +String email
                  +String phone
                  +String address
                }

                User "1" -- "*" StockMovement : records
                Item "1" -- "*" StockMovement : involves
                Supplier "1" -- "*" Item : supplies
            `} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Management Use Cases</CardTitle>
            <CardDescription>Core inventory management functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={`
              graph TD
                subgraph Inventory Operations
                    A1[Add New Item]
                    A2[Update Item Details]
                    A3[Track Stock Levels]
                    A4[Generate Barcodes]
                    A5[Scan Items]
                    A6[View Stock History]
                end

                subgraph Actors
                    B1[Admin]
                    B2[Manager]
                    B3[Warehouse Staff]
                end

                B1 --> A1
                B1 --> A2
                B1 --> A3
                B1 --> A4
                B1 --> A5
                B1 --> A6

                B2 --> A1
                B2 --> A2
                B2 --> A3
                B2 --> A4
                B2 --> A5
                B2 --> A6

                B3 --> A3
                B3 --> A5
                B3 --> A6
            `} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Movement Use Cases</CardTitle>
            <CardDescription>Stock movement and tracking operations</CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={`
              graph TD
                subgraph Stock Operations
                    C1[Record Stock In]
                    C2[Record Stock Out]
                    C3[Transfer Stock]
                    C4[Adjust Inventory]
                    C5[Generate Reports]
                end

                subgraph Actors
                    D1[Admin]
                    D2[Manager]
                    D3[Warehouse Staff]
                end

                D1 --> C1
                D1 --> C2
                D1 --> C3
                D1 --> C4
                D1 --> C5

                D2 --> C1
                D2 --> C2
                D2 --> C3
                D2 --> C5

                D3 --> C1
                D3 --> C2
                D3 --> C3
            `} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next.js Server/Client Components Architecture</CardTitle>
            <CardDescription>Component rendering and data flow</CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={`
              graph TD
                subgraph Server Components
                    S1[Layout Component]
                    S2[Page Components]
                    S3[Database Operations]
                    S4[API Routes]
                end

                subgraph Client Components
                    C1[Theme Toggle]
                    C2[Forms]
                    C3[Interactive UI]
                    C4[Auth Provider]
                end

                subgraph Data Flow
                    D1[Server-Side Props]
                    D2[Client-Side State]
                    D3[API Requests]
                end

                S1 --> C1
                S2 --> C2
                S2 --> C3
                C2 --> D3
                D3 --> S4
                S4 --> S3
                S3 --> D1
                D1 --> C3
                C3 --> D2
            `} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Technologies and tools used in development</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <h3>Frontend</h3>
            <ul>
              <li><strong>Next.js 15.1.3:</strong> React framework with server/client components</li>
              <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for styling</li>
              <li><strong>shadcn/ui:</strong> Reusable component library based on Radix UI</li>
              <li><strong>Lucide Icons:</strong> Modern icon library</li>
              <li><strong>next-themes:</strong> Theme management for dark/light modes</li>
            </ul>

            <h3>State Management & Forms</h3>
            <ul>
              <li><strong>React Hook Form:</strong> Form validation and handling</li>
              <li><strong>Zod:</strong> TypeScript-first schema validation</li>
              <li><strong>Context API:</strong> Global state management</li>
            </ul>

            <h3>Development Environment</h3>
            <ul>
              <li><strong>TypeScript:</strong> Static typing and enhanced developer experience</li>
              <li><strong>ESLint:</strong> Code quality and consistency</li>
              <li><strong>Prettier:</strong> Code formatting</li>
              <li><strong>VS Code:</strong> Primary IDE with extensions for TypeScript and Tailwind</li>
            </ul>

            <h3>Key Features</h3>
            <ul>
              <li>Server-Side Rendering (SSR) for improved performance</li>
              <li>Role-based access control (RBAC)</li>
              <li>Responsive design for all devices</li>
              <li>Dark/Light theme support</li>
              <li>Real-time inventory tracking</li>
              <li>Barcode scanning capability</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
