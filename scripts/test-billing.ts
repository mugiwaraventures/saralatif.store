
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/embryonic';

async function test() {
    console.log('Testing Billing Address...');

    const payload = {
        ExternalRef: 'debug_test_billing_01',
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
        },
        // Add Billing
        BillingAddress: {
            FirstName: 'Madson',
            LastName: 'Araujo',
            Line1: 'Test St',
            City: 'Lisbon',
            PostCode: '1000',
            CountryId: 177,
            CountryCode: 'PT'
        },
        OrderItems: [
            { ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1 }
        ]
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `ApiKey ${API_KEY}` },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log('Response:', text);
    } catch (e) { console.log(e.message); }
}

test();
