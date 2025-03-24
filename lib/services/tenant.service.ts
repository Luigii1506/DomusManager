// lib/services/tenant.service.ts
import { db } from "@/lib/db";
import { Tenant } from "@prisma/client";

export const tenantService = {
  async getAllTenants() {
    return await db.tenant.findMany({
      include: {
        property: true, // Incluir la propiedad relacionada
      },
    });
  },

  async getTenantById(id: string) {
    return await db.tenant.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });
  },

  async createTenant(data: {
    name: string;
    email: string;
    phone?: string;
    leaseStart: Date;
    leaseEnd: Date;
    propertyId: string;
  }) {
    return await db.tenant.create({
      data,
    });
  },

  async updateTenant(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      phone?: string;
      leaseStart: Date;
      leaseEnd: Date;
      propertyId: string;
    }>
  ) {
    return await db.tenant.update({
      where: { id },
      data,
    });
  },

  async deleteTenant(id: string) {
    return await db.tenant.delete({
      where: { id },
    });
  },
};
