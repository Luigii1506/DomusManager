"use client";

import { useState, useEffect } from "react";
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
import { PropertyType, PropertyStatus } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";

interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  features: {
    amenities: string[];
    parking: string[];
    security: string[];
  };
  images: Array<{ url: string }>;
}

export function PropertyList() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, [searchTerm, propertyType]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (propertyType !== "all") params.append("type", propertyType);

      const response = await fetch(`/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch properties");

      const { data } = await response.json();
      setProperties(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again later.",
        variant: "destructive",
      });
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <SelectItem value="APARTMENT">Apartment</SelectItem>
            <SelectItem value="HOUSE">House</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading properties...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <img
                src={property.images[0]?.url || "/placeholder-property.jpg"}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{property.title}</span>
                  <span
                    className={`rounded px-2 py-1 text-sm ${
                      property.status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {property.status.charAt(0).toUpperCase() +
                      property.status.slice(1).toLowerCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {property.address}, {property.city}, {property.state}
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
      )}
    </div>
  );
}
