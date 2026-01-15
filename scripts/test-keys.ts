
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/embryonic';

// Base payload with valid Address and CountryId
const basePayload = {
    ExternalRef: 'debug_test_keys_01',
    Email: 'sarapereiralatif@gmail.com',
    FirstName: 'Madson',
    LastName: 'Araujo',
    ShippingAddress: {
        FirstName: 'Madson',
        LastName: 'Araujo',
        Line1: 'Test St',
        City: 'Lisbon',
        PostCode: '1000',
        CountryId: 177,
        CountryCode: 'PT'
    }
};

const item = {
    ProductId: 7644225,
    PrintOptionId: 2436455,
    Quantity: 1
};

async function testKey(keyName: string) {
    console.log(`\nTesting Key: ${keyName} ...`);
    const payload = { ...basePayload, [keyName]: [item] };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `ApiKey ${API_KEY}` },
            body: JSON.stringify(payload)
        });
        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log('Response:', text.substring(0, 300));
        return res.status;
    } catch (e) { console.log(e.message); }
}

async function run() {
    await testKey('Items');
    await testKey('items');
    await testKey('OrderItems');
    await testKey('orderItems');
    await testKey('OrderLines');
}

run();
