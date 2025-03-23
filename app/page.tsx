'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, FileText, Wrench, PieChart, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Property Management',
      icon: <Building2 className="h-6 w-6" />,
      description: 'Manage properties, listings, and details',
      href: '/properties'
    },
    {
      title: 'Tenant & Owner Portal',
      icon: <Users className="h-6 w-6" />,
      description: 'Access for tenants and property owners',
      href: '/portal'
    },
    {
      title: 'Contracts & Documents',
      icon: <FileText className="h-6 w-6" />,
      description: 'Handle contracts and legal documents',
      href: '/documents'
    },
    {
      title: 'Maintenance',
      icon: <Wrench className="h-6 w-6" />,
      description: 'Track maintenance requests and repairs',
      href: '/maintenance'
    },
    {
      title: 'Reports & Analytics',
      icon: <PieChart className="h-6 w-6" />,
      description: 'View financial reports and statistics',
      href: '/reports'
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-6 w-6" />,
      description: 'Manage alerts and communications',
      href: '/notifications'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-primary">PropManager</h1>
          <p className="mt-2 text-muted-foreground">Complete Real Estate Management Solution</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started Today</h2>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © 2025 PropManager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}