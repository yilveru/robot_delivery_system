import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type OrderRowProps = {
    orderId: string;
    robotId: string | null;
};

export default function RobotAssignButton({ orderId, robotId }: OrderRowProps) {
    const [showErrorTooltip, setShowErrorTooltip] = useState(false);

    const assignRobot = async (orderId: string) => {
        try {
            const res = await fetch('/api/robots/assign', {
                method: 'POST',
                body: JSON.stringify({ orderId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                setShowErrorTooltip(true);
                setTimeout(() => setShowErrorTooltip(false), 3000);
                return;
            }

            window.location.reload();
        } catch (err) {
            setShowErrorTooltip(true);
            setTimeout(() => setShowErrorTooltip(false), 3000);
            console.error(err);
        }
    };

    if (robotId) return <span>{robotId}</span>;

    return (
        <TooltipProvider>
            <Tooltip open={showErrorTooltip}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => assignRobot(orderId)}
                        className="text-blue-600 hover:underline"
                    >
                        Assing robot
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <p>No robots available to assign this order</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}