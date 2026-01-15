
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;

async function test() {
    console.log('Testing Embryonic Creation with CountryCode fix...');

    // Payload identical to the one that failed on 'confirmed' endpoint
    const payload = {
        ExternalRef: 'debug_test_production_sim_01',
        Email: 'sarapereiralatif@gmail.com',
        ShippingAddress: {
            FirstName: "Madson",
            LastName: "Araujo",
            Line1: "Estrada do peroleite",
            Line2: "Santa Susana",
            City: "sao joao das lampas",
            PostCode: "2705727",
            CountryCode: "PT"
        },
        Items: [
            {
                ProductId: 7644225,
                PrintOptionId: 2436455,
                Quantity: 1
            }
        ]
    };

    try {
        // Test Embryonic
        const res = await fetch('https://api.creativehub.io/api/v1/orders/embryonic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        console.log(`Embryonic Status: ${res.status}`);
        const text = await res.text();
        console.log('Response:', text);

    } catch (e) {
        console.log('Error:', e.message);
    }
}

test();
