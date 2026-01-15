
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

async function test(name: string, items: any[]) {
    console.log(`\nTesting: ${name} ...`);
    const payload = {
        ExternalRef: 'debug_conf_' + name,
        Email: 'sarapereiralatif@gmail.com',
        FirstName: 'Madson',
        LastName: 'Araujo',
        ShippingAddress: baseAddr,
        OrderItems: items
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

async function run() {
    // 1. Replicate Failure
    await test('FAIL_REPLICA', [{
        ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1,
        Attributes: { Paper: "Hahnemühle Photo Rag", Size: "21x30cm" }
    }]);

    // 2. No Attributes
    await test('NO_ATTRS', [{
        ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1
    }]);

    // 3. SKU Only
    await test('SKU_ONLY', [{
        ExternalSku: "7644225-2436455", Quantity: 1
    }]);

    // 4. No Umlaut
    await test('NO_UMLAUT', [{
        ProductId: 7644225, PrintOptionId: 2436455, Quantity: 1,
        Attributes: { Paper: "Hahnemuhle Photo Rag", Size: "21x30cm" }
    }]);
}

run();
