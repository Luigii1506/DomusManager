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

interface MaintenanceRecord {
  id: number;
  title: string;
  status: string;
  date: string;
  cost: number;
}

interface PropertyMaintenanceProps {
  maintenanceHistory: MaintenanceRecord[];
}

export function PropertyMaintenance({
  maintenanceHistory,
}: PropertyMaintenanceProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Maintenance Records</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {maintenanceHistory.map((record) => (
          <Card key={record.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {record.title}
              </CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Date: {new Date(record.date).toLocaleDateString()}
                <br />
                Cost: ${record.cost}
              </CardDescription>
              <div className="mt-2 flex items-center justify-between">
                <Badge
                  variant={
                    record.status === "completed" ? "default" : "secondary"
                  }
                >
                  {record.status}
                </Badge>
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
