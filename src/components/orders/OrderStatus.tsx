import { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Order } from "@/types/order";

export default function OrderStatus({ order }: { order: Order }) {
    const [status, setStatus] = useState(order.status);
    const [completedAt, setCompletedAt] = useState("");
    const [loading, setLoading] = useState(false);
    const [showErrorTooltip, setShowErrorTooltip] = useState(false);
    const [error, setError] = useState("");

    const validTransitions = {
        pending: 'Assigned',
        assigned: 'Picked up',
        picked_up: 'Delivered',
        delivered: 'Completed',
    };

    const handleStatusChange = async (id: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/orders/${id}/status`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                const err = await res.json();
                setError(err.message || "Failed to update status");
                setShowErrorTooltip(true);
                setTimeout(() => setShowErrorTooltip(false), 3000);
            } else {
                const data = await res.json();
                setStatus(data.status);
                setCompletedAt(data.completedAt || "");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setShowErrorTooltip(true);
            setTimeout(() => setShowErrorTooltip(false), 3000);
            setError("An error occurred");
        }
    };

    return (
        <div>
            Current status: <Badge
                size="sm"
                color={
                    status === "assigned"
                        ? "success"
                        : status === "pending"
                            ? "warning"
                            : "error"
                }
            >
                {status}
            </Badge>

            <TooltipProvider>
                <Tooltip open={showErrorTooltip}>
                    <TooltipTrigger asChild>
                        <span tabIndex={0}>
                        {status === "completed" ? (
                            completedAt ? (
                                <span tabIndex={0}>
                                    (Completed at: {new Date(completedAt).toLocaleString()})
                                </span>
                            ) : (
                                <span>(Completed at: - )</span>
                            )
                        ) : (
                            <Button onClick={() => handleStatusChange(order.id)} disabled={loading}>
                                {loading ? "Updating..." : `Change to ${validTransitions[status as keyof typeof validTransitions]}`}
                            </Button>
                        )}
                        </span>
                    </TooltipTrigger>

                    <TooltipContent side="top">
                        <p>{error}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
