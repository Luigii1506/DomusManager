export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  features: {
    amenities: string[];
    parking: string[];
    security: string[];
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
  yearBuilt: number;
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
