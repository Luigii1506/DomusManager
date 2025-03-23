'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, Calendar, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="lease">Lease</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Rent Payment Reminder</h3>
                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your rent payment for Apartment 4B is due in 3 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-green-100">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Maintenance Update</h3>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your maintenance request has been completed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-yellow-100">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Lease Renewal</h3>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your lease is up for renewal in 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Rent Payment Reminder</h3>
                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your rent payment for Apartment 4B is due in 3 days.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-green-100">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Maintenance Update</h3>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your maintenance request has been completed.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lease">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="rounded-full p-2 bg-yellow-100">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Lease Renewal</h3>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your lease is up for renewal in 30 days.
                
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}