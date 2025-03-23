'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function MaintenancePage() {
  const [requestType, setRequestType] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>
        <Button>
          <Wrench className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>New Maintenance Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Property</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apt4b">Apartment 4B - Downtown Complex</SelectItem>
                    <SelectItem value="house7">House 7 - Suburban Villas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Request Type</label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="appliance">Appliance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the issue in detail..." className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input type="tel" placeholder="Enter your contact number" />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Plumbing Issue - Apartment 4B</h3>
                  <p className="text-sm text-muted-foreground">Submitted: Mar 15, 2025</p>
                  <p className="mt-2">Leaking faucet in master bathroom needs repair...</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                  In Progress
                </span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">HVAC Maintenance - House 7</h3>
                  <p className="text-sm text-muted-foreground">Submitted: Mar 12, 2025</p>
                  <p className="mt-2">Annual AC system check and filter replacement...</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}