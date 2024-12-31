"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns, Supplier } from "./columns";
import { withRoleCheck } from "@/components/with-role-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/use-toast";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialData: Supplier[] = [];

function SuppliersPage() {
  const [data, setData] = useState<Supplier[]>(initialData);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    status: "Active"
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const response = await fetch("/api/suppliers");
    const suppliers = await response.json();
    setData(suppliers);
  };

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    });
    const supplier = await response.json();
    setData([...data, supplier]);
    setNewSupplier({ name: "", contact: "", email: "", phone: "", address: "", status: "Active" });
    toast({ title: "Supplier added", description: `${supplier.name} has been added to suppliers list.` });
  };

  const handleDeleteSupplier = async (id: string) => {
    await fetch(`/api/suppliers`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ supplierId: id }),
    });
    setData(data.filter(supplier => supplier.id !== id));
    toast({ title: "Supplier deleted", description: "Supplier has been removed." });
  };

  const canAddSupplier = user?.role === "admin" || user?.role === "manager"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Management</h2>
      </div>

      {canAddSupplier && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input
                    id="contact"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Add Supplier</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default withRoleCheck(SuppliersPage, ["admin", "manager"]);
