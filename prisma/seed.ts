import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.upsert({
      where: { email: "admin@domusmanager.com" },
      update: {},
      create: {
        email: "admin@domusmanager.com",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log({ admin });

    // Create sample property
    const property = await prisma.property.create({
      data: {
        title: "Modern Downtown Apartment",
        description: "A beautiful modern apartment in the heart of downtown.",
        type: "APARTMENT",
        status: "AVAILABLE",
        price: 2500,
        size: 1200,
        bedrooms: 2,
        bathrooms: 2,
        yearBuilt: 2020,
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        ownerId: admin.id,
        features: {
          create: {
            amenities: {
              create: [
                { name: "Air Conditioning" },
                { name: "Heating" },
                { name: "Washer/Dryer" },
              ],
            },
            parking: {
              create: [{ type: "Garage" }, { type: "Street" }],
            },
            security: {
              create: [{ type: "24/7 Security" }, { type: "CCTV" }],
            },
          },
        },
        images: {
          create: [
            { url: "https://example.com/image1.jpg" },
            { url: "https://example.com/image2.jpg" },
          ],
        },
      },
    });

    console.log({ property });
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
