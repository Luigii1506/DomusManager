import { NextResponse } from "next/server";
import { propertyService } from "@/lib/services/property.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ZodError } from "zod";
import { PropertyType, PropertyStatus } from "@prisma/client";
import { z } from "zod";

const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus).default("AVAILABLE"),
  price: z.number().positive("Price must be positive"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  size: z
    .number()
    .int()
    .nonnegative("Size must be zero or positive")
    .default(100),
  bedrooms: z
    .number()
    .int()
    .positive("Number of bedrooms must be positive")
    .default(1),
  bathrooms: z
    .number()
    .int()
    .positive("Number of bathrooms must be positive")
    .default(1),
  yearBuilt: z
    .number()
    .int()
    .positive("Year built must be positive")
    .default(2000),
  features: z
    .object({
      amenities: z.array(z.string()).default([]),
      parking: z.array(z.string()).default([]),
      security: z.array(z.string()).default([]),
    })
    .optional()
    .default({
      amenities: [],
      parking: [],
      security: [],
    }),
  images: z.array(z.string()).default([]),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search") || undefined;
    const propertyType = searchParams.get("type") || undefined;
    const status = searchParams.get("status") || undefined;

    const properties = await propertyService.getAllProperties({
      searchTerm,
      type: propertyType as PropertyType,
      status: status as PropertyStatus,
    });

    return NextResponse.json({ data: properties });
  } catch (error) {
    console.error("[PROPERTIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    try {
      const validatedData = createPropertySchema.parse({
        ...body,
        features: {
          amenities: body.features?.amenities || [],
          parking: Array.isArray(body.features?.parking)
            ? body.features.parking
            : [],
          security: body.features?.security || [],
        },
      });

      const property = await propertyService.createProperty(
        validatedData,
        session.user.id
      );
      return NextResponse.json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { message: "Validation error", errors: error.errors },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("[PROPERTIES_POST]", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}
