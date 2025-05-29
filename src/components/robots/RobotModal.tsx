import { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { faker } from "@faker-js/faker";
import type { Robot } from "@/types/robot";

type Props = {
    onClose: () => void;
    onSave: () => void;
    initialData?: Robot | null;
};


export default function RobotModal({ onClose, onSave, initialData }: Props) {

    const [robotId, setRobotId] = useState(initialData?.robotId ?? faker.phone.imei());
    const [status, setStatus] = useState(initialData?.status ?? 'available');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isEdit = !!initialData;

    useEffect(() => {
        if (initialData) {
            setRobotId(initialData.robotId);
            setStatus(initialData.status);
        }
    }, [initialData]);

    const handleSubmit = async () => {
        setIsSaving(true);
        setError('');
        setSuccess('');

        const res = await fetch('/api/robots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: initialData?.id,
                robotId,
                status,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || 'Error saving robot');
            setIsSaving(false);
            return;
        }

        setSuccess('Robot saved successfully!');

        setTimeout(() => {
            onSave();
        }, 1500);
    };


    const statusOptions = [
        { value: "available", label: "Available" },
        { value: "busy", label: "Busy" },
        { value: "offline", label: "Offline" },
    ];

    return (
        <Modal isOpen={true} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Add Robot
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Create a new robot for your delivery system.
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                        <div className="mt-7">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Robot ID</Label>
                                    <Input name='robotId' type="text" defaultValue={robotId} onChange={(e) => setRobotId(e.target.value)} />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Status</Label>
                                    <div className="relative">
                                        <Select
                                            options={statusOptions}
                                            placeholder="Select Option"
                                            onChange={(option) => setStatus(option || '')}
                                            className="dark:bg-dark-900"
                                            defaultValue={status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSubmit}>
                                {isSaving ? 'Saving...' : isEdit ? 'Save changes' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}