"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bath, BedDouble, Building2, DollarSign, MapPin } from "lucide-react";

// Mock properties data - replace with actual data from your API
const properties = [
  {
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
  },
  {
    id: 2,
    title: "Luxury Beach House",
    type: "house",
    location: "456 Ocean Ave, Beachfront",
    price: 5000,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400",
    status: "rented",
  },
  // Add more properties as needed
];

export function PropertyList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      propertyType === "all" || property.type === propertyType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="h-48 w-full object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{property.title}</span>
                <span
                  className={`rounded px-2 py-1 text-sm ${
                    property.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.status.charAt(0).toUpperCase() +
                    property.status.slice(1)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />${property.price}/month
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    {property.bedrooms} beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms} baths
                  </div>
                </div>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => router.push(`/properties/${property.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
