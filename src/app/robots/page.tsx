
import ComponentCard from "@/components/common/ComponentCard";
import RobotsTable from "@/components/robots/RobotsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Robots",
  description:
    "Manage your robots",
};

export default async function RobotsPage() {
  return (
     <div>
      <div className="space-y-6">
        <ComponentCard title="Robots Table" >
          <RobotsTable />
        </ComponentCard>
      </div>
    </div>
  );
}