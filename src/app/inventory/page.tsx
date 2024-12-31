"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { columns, InventoryItem } from "./columns"
import { withRoleCheck } from "@/components/with-role-check"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialData: InventoryItem[] = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop",
    quantity: 50,
    location: "Warehouse A",
    barcode: "LAP001",
    lastUpdated: new Date().toLocaleDateString(),
    status: "In Stock"
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model smartphone",
    quantity: 10,
    location: "Warehouse B",
    barcode: "PHN001",
    lastUpdated: new Date().toLocaleDateString(),
    status: "Low Stock"
  },
  {
    id: "3",
    name: "Headphones",
    description: "Wireless noise-canceling headphones",
    quantity: 0,
    location: "Warehouse A",
    barcode: "HEAD001",
    lastUpdated: new Date().toLocaleDateString(),
    status: "Out of Stock"
  }
]

function InventoryPage() {
  const [data, setData] = useState(initialData)
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    description: "",
    quantity: 0,
    location: "",
    barcode: ""
  })
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const item: InventoryItem = {
      id: (data.length + 1).toString(),
      name: newItem.name || "",
      description: newItem.description || "",
      quantity: newItem.quantity || 0,
      location: newItem.location || "",
      barcode: newItem.barcode || "",
      lastUpdated: new Date().toLocaleDateString(),
      status: newItem.quantity && newItem.quantity > 20 ? "In Stock" : 
              newItem.quantity && newItem.quantity > 0 ? "Low Stock" : 
              "Out of Stock"
    }
    setData([...data, item])
    setNewItem({
      name: "",
      description: "",
      quantity: 0,
      location: "",
      barcode: ""
    })
    toast({
      title: "Item added",
      description: `${item.name} has been added to inventory.`,
    })
  }

  const canAddItem = user?.role === "admin" || user?.role === "manager"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
      </div>

      {canAddItem && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    value={newItem.barcode}
                    onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Add Item</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default withRoleCheck(InventoryPage, ["admin", "manager", "warehouse"])
