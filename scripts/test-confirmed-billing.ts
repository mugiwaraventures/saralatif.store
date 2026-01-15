
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/confirmed';

const baseAddr = {
    FirstName: 'Madson',
    LastName: 'Araujo',
    Line1: 'Test St',
    City: 'Lisbon',
    PostCode: '1000',
    CountryId: 177
};

async function test() {
    console.log(`\nTesting: BILLING_ADDR ...`);
    const payload = {
        ExternalRef: 'debug_conf_billing_01',
        Email: 'sarapereiralatif@gmail.com',
        FirstName: 'Madson',
        LastName: 'Araujo',
        ShippingAddress: baseAddr,
        BillingAddress: baseAddr, // Add billing
        OrderItems: [{
            ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1
        }]
    };

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

test();
