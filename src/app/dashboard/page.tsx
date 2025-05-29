
import ComponentCard from "@/components/common/ComponentCard";
import OrdersTable from "@/components/orders/OrdersTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your delivery system with ease using our dashboard. Track orders, monitor robots, and optimize routes for efficient deliveries.",
};

export default async function DashboardPage() {
  return (
     <div>
      <div className="space-y-6">
        <ComponentCard title="Orders Table" >
          <OrdersTable />
        </ComponentCard>
      </div>
    </div>
  );
}