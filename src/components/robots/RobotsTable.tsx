"use client";

import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RobotModal from "@/components/robots/RobotModal";
import type { Robot } from "@/types/robot";

import { Pencil, UserPlus } from "lucide-react";

export default function RobotsTable() {

  const [modalOpen, setModalOpen] = useState(false);
  const [robotToEdit, setRobotToEdit] = useState<Robot | null>(null);
  const [robots, setRobots] = useState<Robot[]>([]);
  async function loadRobots() {
    const res = await fetch("/api/robots");
    const data = await res.json();
    setRobots(data);
  }
  useEffect(() => {
    loadRobots();
  }, []);

  function handleSave() {
    loadRobots(); // reload data
    setModalOpen(false); // close modal
  }

  function openForCreate() {
    setRobotToEdit(null);
    setModalOpen(true);
  }

  function openForEdit(robot: Robot) {
    setRobotToEdit(robot);
    setModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openForCreate}
          className="flex w-full items-center justify-center gap-2 rounded-full margin-botton-4 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <UserPlus />
          Add Robot
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Robot ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Last known Location
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(robots) && robots.map((robot) => (
                  <TableRow key={robot.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {robot.robotId}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {robot.status}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {robot.lastKnownLocation}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <button
                        onClick={() => openForEdit(robot)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                      >
                        <Pencil />
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {modalOpen && (
        <RobotModal
          onClose={() => setModalOpen(false)}
          initialData={robotToEdit || undefined}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
