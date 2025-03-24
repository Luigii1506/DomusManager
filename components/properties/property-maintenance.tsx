"use client";

import { Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";

export interface MaintenanceRecord {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  cost: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyMaintenanceProps {
  propertyId: string;
  maintenanceRecords: MaintenanceRecord[];
}

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-100 text-gray-800",
};

export function PropertyMaintenance({
  propertyId,
  maintenanceRecords,
}: PropertyMaintenanceProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Maintenance Records</CardTitle>
        <Button>Add Record</Button>
      </CardHeader>
      <CardContent>
        {maintenanceRecords.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No maintenance records found.
          </p>
        ) : (
          <div className="grid gap-4">
            {maintenanceRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col space-y-2 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{record.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={priorityColors[record.priority]}
                    >
                      {record.priority}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={statusColors[record.status]}
                    >
                      {record.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {record.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </span>
                  {record.cost && (
                    <span className="font-medium">
                      Cost: {formatCurrency(record.cost)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
