import { Property } from './types';
import PropertyDetails from './PropertyDetails';

// Mock properties data for static paths
const properties: Property[] = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    type: 'apartment',
    location: '123 Main St, Downtown',
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    yearBuilt: 2020,
    description: 'Luxurious modern apartment in the heart of downtown. Features high-end finishes, open concept living area, and stunning city views.',
    amenities: ['Central AC', 'In-unit Laundry', 'Parking Space', 'Pet Friendly', 'Storage Unit'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200',
    ],
    status: 'available',
    documents: [
      { name: 'Lease Agreement', date: '2025-01-15' },
      { name: 'Property Inspection Report', date: '2025-01-10' },
    ],
    maintenance: [
      { 
        title: 'HVAC Maintenance',
        status: 'completed',
        date: '2025-02-15',
        description: 'Annual HVAC system check and filter replacement'
      },
      {
        title: 'Paint Touch-up',
        status: 'scheduled',
        date: '2025-03-20',
        description: 'Interior wall paint touch-up in living room'
      }
    ],
    tenants: [
      {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        leaseStart: '2025-01-01',
        leaseEnd: '2026-01-01'
      }
    ]
  },
  {
    id: 2,
    title: 'Luxury Beach House',
    type: 'house',
    location: '456 Ocean Ave, Beachfront',
    price: 5000,
    bedrooms: 4,
    bathrooms: 3,
    size: 2800,
    yearBuilt: 2022,
    description: 'Stunning beachfront property with panoramic ocean views. Features modern amenities and direct beach access.',
    amenities: ['Private Beach Access', 'Pool', 'Garage', 'Smart Home System', 'Outdoor Kitchen'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200',
    ],
    status: 'rented',
    documents: [
      { name: 'Rental Agreement', date: '2025-02-01' },
      { name: 'Property Survey', date: '2025-01-20' },
    ],
    maintenance: [
      {
        title: 'Pool Maintenance',
        status: 'completed',
        date: '2025-03-01',
        description: 'Monthly pool cleaning and chemical balance'
      }
    ],
    tenants: [
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '(555) 987-6543',
        leaseStart: '2025-02-01',
        leaseEnd: '2026-02-01'
      }
    ]
  }
];

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const propertyData = properties.find(p => p.id.toString() === params.id) || properties[0];
  return <PropertyDetails propertyData={propertyData} />;
}