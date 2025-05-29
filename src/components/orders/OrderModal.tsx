import { useState, useEffect } from 'react';
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { PackageMinus, PackagePlus } from "lucide-react";

type Props = {
    onClose: () => void;
    onSave: () => void;
};


export default function OrderModal({ onClose, onSave }: Props) {

    const [clientId, setClientId] = useState("");
    const [restaurantId, setRestaurantId] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [items, setItems] = useState([{ id: crypto.randomUUID(), quantity: '', description: '', unitPrice: '' }]);

    const handleItemChange = (id: string, field: string, value: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value, error: false } : item
            )
        );
    };

    const addItem = () => {
        setItems([...items, { id: crypto.randomUUID(), quantity: '', description: '', unitPrice: '' }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const [clients, setClients] = useState<{ id: string; firstName: string; lastName: string; address: string }[]>([]);
    const [restaurants, setRestaurants] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [clientsRes, restaurantsRes] = await Promise.all([
                fetch('/api/clients'),
                fetch('/api/restaurants'),
            ]);

            const clientsData = await clientsRes.json();
            const restaurantsData = await restaurantsRes.json();

            setClients(clientsData);
            setRestaurants(restaurantsData);
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        setIsSaving(true);
        setError('');
        setSuccess('');

        const hasEmptyItems = items.some(item =>
            !item.description.trim() || !item.quantity || !item.unitPrice
        );
        if (hasEmptyItems) {
            setError('All item fields are required.');
            setIsSaving(false);
            return;
        }

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientId: clientId,
                restaurantId: restaurantId,
                items: items.map(i => ({
                    quantity: Number(i.quantity),
                    description: i.description,
                    unitPrice: Number(i.unitPrice),
                })),
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || 'Error saving robot');
            setIsSaving(false);
            return;
        }

        setSuccess('Order saved successfully!');

        setTimeout(() => {
            onSave();
        }, 1500);
    };

    return (
        <Modal isOpen={true} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Create order
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Please fill out the form below to create a new order....
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                        <div className="mt-7">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Client</Label>
                                    <Select
                                        options={clients.map(c => ({ value: c.id, label: c.firstName + ' ' + c.lastName + ' / ' + c.address }))}
                                        placeholder="Select Client"
                                        onChange={(option) => setClientId(option)}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Restaurant</Label>
                                    <Select
                                        options={restaurants.map(r => ({ value: r.id, label: r.name }))}
                                        placeholder="Select Restaurant"
                                        onChange={(option) => setRestaurantId(option)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-7">
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-2 items-end">
                                    <Input
                                        type="number"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Unit Price"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                                    />
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full margin-botton-4 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <PackageMinus className="h-4 w-4" />
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button className="flex w-full items-center justify-center gap-2 rounded-full margin-botton-4 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                                type="button"
                                onClick={() => addItem()}
                            >
                                <PackagePlus className="h-4 w-4" />
                                Add item
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSubmit}>
                                {isSaving ? 'Saving...' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}