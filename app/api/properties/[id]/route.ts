import { NextResponse } from "next/server";
import { propertyService } from "@/lib/services/property.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const property = await propertyService.getPropertyById(params.id);
    return NextResponse.json(property);
  } catch (error) {
    console.error("[PROPERTY_GET]", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}
