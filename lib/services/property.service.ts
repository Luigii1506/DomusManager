import { prisma } from "@/lib/prisma";
import { handleDatabaseError, withRetry } from "@/lib/utils/db-error";
import { Property, PropertyType, PropertyStatus } from "@prisma/client";

export interface CreatePropertyInput {
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  features?: {
    amenities: string[];
    parking: string[];
    security: string[];
  };
  images: string[];
}

export const propertyService = {
  // Get all properties with optional filtering
  async getAllProperties(filters?: {
    searchTerm?: string;
    type?: PropertyType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
  }) {
    try {
      const properties = await withRetry(() =>
        prisma.property.findMany({
          where: {
            AND: [
              filters?.searchTerm
                ? {
                    OR: [
                      {
                        title: {
                          contains: filters.searchTerm,
                          mode: "insensitive",
                        },
                      },
                      {
                        description: {
                          contains: filters.searchTerm,
                          mode: "insensitive",
                        },
                      },
                      {
                        address: {
                          contains: filters.searchTerm,
                          mode: "insensitive",
                        },
                      },
                      {
                        city: {
                          contains: filters.searchTerm,
                          mode: "insensitive",
                        },
                      },
                      {
                        state: {
                          contains: filters.searchTerm,
                          mode: "insensitive",
                        },
                      },
                    ],
                  }
                : {},
              filters?.type ? { type: filters.type } : {},
              filters?.status ? { status: filters.status } : {},
              filters?.minPrice ? { price: { gte: filters.minPrice } } : {},
              filters?.maxPrice ? { price: { lte: filters.maxPrice } } : {},
            ],
          },
          include: {
            features: {
              include: {
                amenities: true,
                parking: true,
                security: true,
              },
            },
            images: true,
          },
        })
      );

      return properties.map((property) => ({
        ...property,
        features: {
          amenities: property.features?.amenities.map((a) => a.name) || [],
          parking: property.features?.parking.map((p) => p.type) || [],
          security: property.features?.security.map((s) => s.type) || [],
        },
        images: property.images.map((img) => img.url),
      }));
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  // Get a single property by ID
  async getPropertyById(id: string) {
    try {
      const property = await withRetry(() =>
        prisma.property.findUnique({
          where: { id },
          include: {
            features: {
              include: {
                amenities: true,
                parking: true,
                security: true,
              },
            },
            images: true,
            documents: true,
            maintenanceRecords: true,
          },
        })
      );

      if (!property) {
        throw new Error("Property not found");
      }

      return {
        ...property,
        features: {
          amenities: property.features?.amenities.map((a) => a.name) || [],
          parking: property.features?.parking.map((p) => p.type) || [],
          security: property.features?.security.map((s) => s.type) || [],
        },
        images: property.images.map((img) => img.url),
      };
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  // Create a new property
  async createProperty(data: CreatePropertyInput, userId: string) {
    try {
      return await withRetry(() =>
        prisma.property.create({
          data: {
            ...data,
            userId,
            features: data.features
              ? {
                  create: {
                    amenities: {
                      create: data.features.amenities.map((name) => ({ name })),
                    },
                    parking: {
                      create: data.features.parking.map((type) => ({ type })),
                    },
                    security: {
                      create: data.features.security.map((type) => ({ type })),
                    },
                  },
                }
              : undefined,
            images: {
              create: data.images.map((url) => ({ url })),
            },
          },
          include: {
            features: {
              include: {
                amenities: true,
                parking: true,
                security: true,
              },
            },
            images: true,
          },
        })
      );
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  // Update a property
  async updateProperty(id: string, data: Partial<CreatePropertyInput>) {
    try {
      const property = await withRetry(() =>
        prisma.property.update({
          where: { id },
          data: {
            ...data,
            features: data.features
              ? {
                  upsert: {
                    create: {
                      amenities: {
                        create: data.features.amenities.map((name) => ({
                          name,
                        })),
                      },
                      parking: {
                        create: data.features.parking.map((type) => ({ type })),
                      },
                      security: {
                        create: data.features.security.map((type) => ({
                          type,
                        })),
                      },
                    },
                    update: {
                      amenities: {
                        deleteMany: {},
                        create: data.features.amenities.map((name) => ({
                          name,
                        })),
                      },
                      parking: {
                        deleteMany: {},
                        create: data.features.parking.map((type) => ({ type })),
                      },
                      security: {
                        deleteMany: {},
                        create: data.features.security.map((type) => ({
                          type,
                        })),
                      },
                    },
                  },
                }
              : undefined,
            images: data.images
              ? {
                  deleteMany: {},
                  create: data.images.map((url) => ({ url })),
                }
              : undefined,
          },
          include: {
            features: {
              include: {
                amenities: true,
                parking: true,
                security: true,
              },
            },
            images: true,
          },
        })
      );

      return {
        ...property,
        features: {
          amenities: property.features?.amenities.map((a) => a.name) || [],
          parking: property.features?.parking.map((p) => p.type) || [],
          security: property.features?.security.map((s) => s.type) || [],
        },
        images: property.images.map((img) => img.url),
      };
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  // Delete a property
  async deleteProperty(id: string) {
    try {
      await withRetry(() =>
        prisma.property.delete({
          where: { id },
        })
      );
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },
};
