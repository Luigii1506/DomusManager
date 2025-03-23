'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, LineChart } from 'recharts';

const mockData = {
  monthly: [
    { month: 'Jan', income: 45000, expenses: 32000 },
    { month: 'Feb', income: 47000, expenses: 33000 },
    { month: 'Mar', income: 46000, expenses: 34000 },
    { month: 'Apr', income: 48000, expenses: 32000 },
    { month: 'May', income: 49000, expenses: 33000 },
    { month: 'Jun', income: 51000, expenses: 35000 },
  ],
  occupancy: [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 94 },
    { month: 'Mar', rate: 93 },
    { month: 'Apr', rate: 95 },
    { month: 'May', rate: 94 },
    { month: 'Jun', rate: 96 },
  ]
};

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-4">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$286,000</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">94%</p>
            <p className="text-sm text-green-600">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">48</p>
            <p className="text-sm text-muted-foreground">Out of 52 units</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockData.monthly}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Revenue"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockData.occupancy}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name="Occupancy Rate %"
                    stroke="hsl(var(--chart-3))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              <div className="font-medium">Property</div>
              <div className="font-medium">Revenue</div>
              <div className="font-medium">Expenses</div>
              <div className="font-medium">Occupancy</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              <div>Downtown Complex</div>
              <div className="text-green-600">$125,000</div>
              <div className="text-red-600">$45,000</div>
              <div>96%</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              <div>Suburban Villas</div>
              <div className="text-green-600">$98,000</div>
              <div className="text-red-600">$38,000</div>
              <div>92%</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4">
              <div>City View Apartments</div>
              <div className="text-green-600">$63,000</div>
              <div className="text-red-600">$28,000</div>
              <div>94%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}