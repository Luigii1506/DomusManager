"use client";

import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock tenant data - replace with actual data fetching
const tenants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    leaseStart: "2024-01-01",
    leaseEnd: "2025-01-01",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 987-6543",
    leaseStart: "2024-02-01",
    leaseEnd: "2025-02-01",
    status: "active",
  },
];

interface PropertyTenantsProps {
  propertyId: number;
}

export function PropertyTenants({ propertyId }: PropertyTenantsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Current Tenants</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {tenant.name}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Email: {tenant.email}
                <br />
                Phone: {tenant.phone}
                <br />
                Lease: {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                {new Date(tenant.leaseEnd).toLocaleDateString()}
              </CardDescription>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
