import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validar datos (puedes usar zod u otra biblioteca para validación)
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Crear inquilino
    const tenant = await prisma.tenant.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        currentAddress: body.currentAddress,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        employmentStatus: body.employmentStatus,
        employerName: body.employerName || null,
        monthlyIncome: body.monthlyIncome,
        emergencyContactName: body.emergencyContactName,
        emergencyContactPhone: body.emergencyContactPhone,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(tenant, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tenant:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Obtener inquilinos
    const tenants = await prisma.tenant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tenants, { status: 200 });
  } catch (error: any) {
    console.error("Error getting tenants:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
