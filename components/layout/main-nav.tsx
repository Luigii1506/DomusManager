"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  FileText,
  Settings,
  LayoutDashboard,
  Wrench,
  Receipt,
} from "lucide-react";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/properties",
    label: "Properties",
    icon: Building2,
  },
  {
    href: "/tenants",
    label: "Tenants",
    icon: Users,
  },
  {
    href: "/maintenance",
    label: "Maintenance",
    icon: Wrench,
  },
  {
    href: "/documents",
    label: "Documents",
    icon: FileText,
  },
  {
    href: "/payments",
    label: "Payments",
    icon: Receipt,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
