
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const API_URL = 'https://api.creativehub.io/api/v1/orders/embryonic';

const baseItem = {
    ProductId: 7644225,
    PrintOptionId: 2436455,
    Quantity: 1
};

async function testPayload(name: string, attrs: any) {
    console.log(`\nTesting: ${name} ...`);
    // ... Payload construction ...
    const payload = {
        ExternalRef: 'debug_test_attrs_' + name,
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
        OrderItems: [
            { ...baseItem, Attributes: attrs }
        ]
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `ApiKey ${API_KEY}` },
            body: JSON.stringify(payload)
        });
        console.log(`Status: ${res.status}`);
        if (res.status !== 500 && res.status !== 404) {
            const text = await res.text();
            console.log('SUCCESS/DIFFERENT:', text);
        } else {
            // output small
            console.log(`Failed (${res.status})`);
        }
    } catch (e) { console.log(e.message); }
}

async function run() {
    await testPayload('Norm_Umlaut', { Paper: "Hahnemühle Photo Rag", Size: "21x30cm" });
    await testPayload('No_Umlaut', { Paper: "Hahnemuhle Photo Rag", Size: "21x30cm" });
    await testPayload('Size_A4', { Paper: "Hahnemühle Photo Rag", Size: "A4" });
    // Also try without Size (maybe Size is inferred?)
    await testPayload('No_Size', { Paper: "Hahnemühle Photo Rag" });
    // Try without Paper
    await testPayload('No_Paper', { Size: "21x30cm" });
}

run();
