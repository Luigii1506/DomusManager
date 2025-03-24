"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: "1",
    type: "PAYMENT",
    title: "Rent Payment Received",
    description: "Tenant John Doe paid $1,500 for Apartment 3B",
    timestamp: "2 hours ago",
    user: {
      name: "John Doe",
      image: "/avatars/01.png",
      initials: "JD",
    },
  },
  {
    id: "2",
    type: "MAINTENANCE",
    title: "Maintenance Request",
    description: "New request for plumbing repair at Unit 5A",
    timestamp: "4 hours ago",
    user: {
      name: "Sarah Smith",
      image: "/avatars/02.png",
      initials: "SS",
    },
  },
  {
    id: "3",
    type: "LEASE",
    title: "Lease Signed",
    description: "New lease agreement signed for Property 7C",
    timestamp: "1 day ago",
    user: {
      name: "Mike Johnson",
      image: "/avatars/03.png",
      initials: "MJ",
    },
  },
  {
    id: "4",
    type: "INSPECTION",
    title: "Property Inspection",
    description: "Completed inspection for Unit 2B",
    timestamp: "2 days ago",
    user: {
      name: "Lisa Brown",
      image: "/avatars/04.png",
      initials: "LB",
    },
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
