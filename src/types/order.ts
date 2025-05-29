export type Order = {
    id: number;
    clientId: number;
    clientName: string;
    robotId: number;
    robotInternalId: string | null;
    restaurantName: string;
    items: Items[];
    status: string;
    createdAt: Date;
    completedAt: Date;
    updatedAt: Date;
};

export type Items = {
    quantity: number;
    description: string;
    unitPrice: number;
};