"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyDetails } from "@/components/properties/property-details";
import { PropertyDocuments } from "@/components/properties/property-documents";
import { PropertyMaintenance } from "@/components/properties/property-maintenance";
import { PropertyTenants } from "@/components/properties/property-tenants";

// Mock property data - replace with actual data fetching
const property = {
  id: 1,
  title: "Modern Downtown Apartment",
  type: "apartment",
  location: "123 Main St, Downtown",
  price: 2500,
  bedrooms: 2,
  bathrooms: 2,
  image:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400",
  status: "available",
  description:
    "A beautiful modern apartment in the heart of downtown. Features include hardwood floors, stainless steel appliances, and a private balcony with city views.",
  amenities: [
    "Central Air",
    "In-unit Laundry",
    "Dishwasher",
    "Parking",
    "Gym Access",
  ],
  squareFeet: 1200,
  yearBuilt: 2018,
  documents: [
    {
      id: 1,
      name: "Lease Agreement.pdf",
      type: "contract",
      uploadedAt: "2024-03-15",
    },
    {
      id: 2,
      name: "Property Insurance.pdf",
      type: "insurance",
      uploadedAt: "2024-02-01",
    },
  ],
  maintenanceHistory: [
    {
      id: 1,
      title: "Plumbing Repair",
      status: "completed",
      date: "2024-02-15",
      cost: 350,
    },
    {
      id: 2,
      title: "HVAC Maintenance",
      status: "scheduled",
      date: "2024-04-01",
      cost: 200,
    },
  ],
};

export default function PropertyDetailsPage() {
  const params = useParams();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {property.title}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Edit Property</Button>
            <Button>List Property</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Property Overview</CardTitle>
              <CardDescription>
                ID: {params.id} | Status: {property.status}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={property.image}
                alt={property.title}
                className="mb-4 h-[300px] w-full rounded-lg object-cover"
              />
              <p className="text-muted-foreground">{property.description}</p>
            </CardContent>
          </Card>

          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Price
                    </dt>
                    <dd className="text-2xl font-bold">${property.price}/mo</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Size
                    </dt>
                    <dd className="text-2xl font-bold">
                      {property.squareFeet} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Bedrooms
                    </dt>
                    <dd className="text-2xl font-bold">{property.bedrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Bathrooms
                    </dt>
                    <dd className="text-2xl font-bold">{property.bathrooms}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="mr-2">•</span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <PropertyDetails property={property} />
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <PropertyDocuments documents={property.documents} />
          </TabsContent>
          <TabsContent value="maintenance" className="space-y-4">
            <PropertyMaintenance
              maintenanceHistory={property.maintenanceHistory}
            />
          </TabsContent>
          <TabsContent value="tenants" className="space-y-4">
            <PropertyTenants propertyId={property.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
