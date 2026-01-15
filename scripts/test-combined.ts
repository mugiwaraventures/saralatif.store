
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/embryonic';

const basePayload = {
    ExternalRef: 'debug_test_comb_01',
    Email: 'sarapereiralatif@gmail.com',
    FirstName: 'Madson',
    LastName: 'Araujo',
    ShippingAddress: {
        FirstName: 'Madson',
        LastName: 'Araujo',
        Line1: 'Test St',
        City: 'Lisbon',
        PostCode: '1000',
        CountryId: 177
    }
};

async function test(name: string, payload: any) {
    console.log(`\nTesting: ${name} ...`);
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `ApiKey ${API_KEY}` },
            body: JSON.stringify(payload)
        });
        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log('Response:', text.substring(0, 300));
    } catch (e) { console.log(e.message); }
}

async function run() {
    // 1. OrderLines Key
    await test('OrderLines_Key', {
        ...basePayload,
        OrderLines: [{ ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1 }]
    });

    // 2. OrderItems Key with PaperId Attribute
    await test('OrderItems_PaperId', {
        ...basePayload,
        OrderItems: [{
            ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1,
            Attributes: { PaperId: "Hahnemühle Photo Rag", Size: "21x30cm" }
        }]
    });
}

run();
