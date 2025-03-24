import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { PropertyList } from "@/components/properties/property-list";
import { AddPropertyButton } from "@/components/properties/add-property-button";

export const metadata: Metadata = {
  title: "Properties | DomusManager",
  description: "Manage your real estate properties",
};

export default async function PropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
          <div className="flex items-center space-x-2">
            <AddPropertyButton />
          </div>
        </div>
        <div className="space-y-4">
          <PropertyList />
        </div>
      </main>
    </div>
  );
}
