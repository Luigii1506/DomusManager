// components/TenantList.tsx
import { useEffect, useState } from "react";
import { Tenant } from "@prisma/client";

export function TenantList() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await fetch("/api/tenants");
      const data = await response.json();
      setTenants(data);
      setLoading(false);
    };

    fetchTenants();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Inquilinos</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            {tenant.name} - {tenant.email}
            {/* Agregar botones para editar y eliminar */}
          </li>
        ))}
      </ul>
    </div>
  );
}
