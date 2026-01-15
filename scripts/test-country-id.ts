
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/embryonic';

async function test() {
    console.log('Testing CountryId: 177 + OrderItems Key ...');

    // Variation 1: OrderItems
    const payload1 = {
        ExternalRef: 'debug_test_key_01',
        Email: 'sarapereiralatif@gmail.com',
        FirstName: "Madson",
        LastName: "Araujo",
        ShippingAddress: {
            FirstName: "Madson",
            LastName: "Araujo",
            Line1: "Line 1",
            City: "City",
            PostCode: "12345",
            CountryId: 177
        },
        OrderItems: [ // Changed from Items
            { ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1 }
        ]
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `ApiKey ${API_KEY}` },
            body: JSON.stringify(payload1)
        });
        console.log(`OrderItems Status: ${res.status}`);
        console.log('Response:', await res.text());
    } catch (e) { console.log(e.message); }
}

test();
