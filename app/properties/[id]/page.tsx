// app/properties/[id]/page.tsx

import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";
import { propertyService } from "@/lib/services/property.service";
import { PropertyDocuments } from "@/components/properties/property-documents";
import { PropertyMaintenance } from "@/components/properties/property-maintenance";

interface PropertyDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  // La obtención de datos se realiza en el servidor
  const property = await propertyService.getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  // Suponiendo que tienes un tipo de datos para los registros de mantenimiento
  const maintenanceRecords = property.maintenanceRecords.map((record) => ({
    ...record,
    cost: record.cost ? Number(record.cost) : null, // Convertir Decimal a number
  }));

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        {/* Encabezado y datos generales */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {property.title}
            </h1>
            <p className="text-lg text-muted-foreground">{property.address}</p>
          </div>
          <Badge variant="outline">{property.status}</Badge>
        </div>

        {/* Tarjetas de Detalles y Ubicación */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Price
                  </dt>
                  <dd className="text-lg font-semibold">
                    {formatCurrency(Number(property.price))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Type
                  </dt>
                  <dd className="text-lg font-semibold">{property.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Size
                  </dt>
                  <dd className="text-lg font-semibold">
                    {property.size} sqft
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Year Built
                  </dt>
                  <dd className="text-lg font-semibold">
                    {property.yearBuilt}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Bedrooms
                  </dt>
                  <dd className="text-lg font-semibold">{property.bedrooms}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Bathrooms
                  </dt>
                  <dd className="text-lg font-semibold">
                    {property.bathrooms}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Address
                  </dt>
                  <dd className="text-lg font-semibold">{property.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    City
                  </dt>
                  <dd className="text-lg font-semibold">{property.city}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    State
                  </dt>
                  <dd className="text-lg font-semibold">{property.state}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    ZIP Code
                  </dt>
                  <dd className="text-lg font-semibold">{property.zipCode}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Descripción y Amenidades */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {property.features?.amenities?.length ? (
                  property.features.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="mr-2">•</span>
                      {amenity}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">
                    No amenities listed
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {property.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={property.title}
                  className="aspect-video rounded-lg object-cover"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs para Documentos y Mantenimiento */}
        <Tabs defaultValue="documents">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          <TabsContent value="documents">
            <PropertyDocuments
              propertyId={property.id}
              documents={property.documents}
            />
          </TabsContent>
          <TabsContent value="maintenance">
            <PropertyMaintenance
              propertyId={property.id}
              maintenanceRecords={maintenanceRecords}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
