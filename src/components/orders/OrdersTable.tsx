"use client";

import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Button from "@/components/ui/button/Button";
import RobotAssignButton from "@/components/robots/AssignButton";
import OrderModal from "@/components/orders/OrderModal";
import OrderItemsModal from "@/components/orders/OrderItemsModal";
import OrderStatus from "@/components/orders/OrderStatus";
import { PackagePlus } from "lucide-react";

import type { Items, Order } from "@/types/order";

export default function OrdersTable() {

  const [modalItemsOpen, setModalItemsOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Items[] | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  function openItemsModal(id: number, items: Items[]) {
    setSelectedItems(items);
    setSelectedOrderId(id);
    setModalItemsOpen(true);
  }

  function openCreate() {
    setModalCreateOpen(true);
  }
  
  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleSave() {
    loadOrders(); // reload data
    setModalCreateOpen(false); // close modal
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full margin-botton-4 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          onClick={openCreate}
        >
          <PackagePlus />
          Add new order
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
                    Id
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Restaurant
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Robot assigned
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Items
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(orders) && orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.clientName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.restaurantName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.robotInternalId ? (
                        order.robotInternalId
                      ) : (
                        <RobotAssignButton orderId={order.id.toString()} robotId={order.robotInternalId} />
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Button onClick={() => openItemsModal(order.id, order.items)}>View items</Button>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <OrderStatus order={order} />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {modalCreateOpen && (
        <OrderModal
          onClose={() => setModalCreateOpen(false)}
          onSave={handleSave}
        />
      )}
      {modalItemsOpen && (
        <OrderItemsModal
          onClose={() => setModalItemsOpen(false)}
          itemsData={selectedItems ?? undefined}
          orderId={selectedOrderId ?? undefined}
        />
      )}
    </div>
  );
}
