export interface Property {
  id: number;
  title: string;
  type: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  yearBuilt: number;
  description: string;
  amenities: string[];
  images: string[];
  status: string;
  documents: Array<{
    name: string;
    date: string;
  }>;
  maintenance: Array<{
    title: string;
    status: string;
    date: string;
    description: string;
  }>;
  tenants: Array<{
    name: string;
    email: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
  }>;
}