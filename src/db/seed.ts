import { db } from "@/db";
import * as schema from "@/db/schema";
import { client } from "@/db/client";
import { faker } from "@faker-js/faker";


async function checkDbConnection() {
    try {
        await client.query("SELECT 1");
        console.log("Correctly connected to the database.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

function clientSeed() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.string.numeric(16),
        address: faker.location.streetAddress(),
    };
}

function restaurantSeed() {
    return {
        name: faker.company.name(),
        phoneNumber: faker.string.numeric(16),
        address: faker.location.streetAddress(),
    };
}

export async function seedDatabase() {
    console.log("Seed start");
    await checkDbConnection();
    const dataClients: (typeof schema.clients.$inferInsert)[] = [];

    for (let i = 0; i < 30; i++) {
        dataClients.push({
            ...clientSeed()
        });
    }
    
    await db.insert(schema.clients).values(dataClients);

    const dataRestaurants: (typeof schema.restaurants.$inferInsert)[] = [];

    for (let i = 0; i < 10; i++) {
        dataRestaurants.push({
            ...restaurantSeed()
        });
    }
    
    await db.insert(schema.restaurants).values(dataRestaurants);
    console.log("Seed done");
};

seedDatabase();