'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, MapPin, DollarSign, BedDouble, Bath, Calendar, FileText, Wrench, Users } from 'lucide-react';
import { Property } from './types';

export default function PropertyDetails({ propertyData }: { propertyData: Property }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        Back to Properties
      </Button>

      <div className="grid gap-6">
        {/* Property Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{propertyData.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              {propertyData.location}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${propertyData.price}/month</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              propertyData.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {propertyData.status.charAt(0).toUpperCase() + propertyData.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <Card>
          <CardContent className="p-0">
            <div className="relative h-[500px]">
              <img
                src={propertyData.images[activeImage]}
                alt={propertyData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 p-4">
              {propertyData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    activeImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${propertyData.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Property Details Tabs */}
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <BedDouble className="h-4 w-4" />
                          <span>{propertyData.bedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4" />
                          <span>{propertyData.bathrooms} Bathrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{propertyData.size} sq ft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Built {propertyData.yearBuilt}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{propertyData.description}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Amenities</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {propertyData.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Property Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">Added: {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyData.maintenance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-sm text-muted-foreground">Date: {item.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenants">
            <Card>
              <CardHeader>
                <CardTitle>Current Tenants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyData.tenants.map((tenant, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">{tenant.name}</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p>{tenant.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p>{tenant.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Lease Start</p>
                          <p>{tenant.leaseStart}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Lease End</p>
                          <p>{tenant.leaseEnd}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}