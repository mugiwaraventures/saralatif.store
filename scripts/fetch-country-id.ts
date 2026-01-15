
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

async function getCountries() {
    console.log('Querying Countries (Debug Struct)...');
    const API_KEY = process.env.CREATIVEHUB_API_KEY;

    try {
        const res = await fetch('https://api.creativehub.io/api/v1/countries/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${API_KEY}`
            },
            body: JSON.stringify({})
        });

        const data = await res.json();
        // Log keys
        console.log('Keys:', Object.keys(data));

        // Log nested array if found
        if (data.Data) {
            console.log('Data count:', data.Data.length);
            const pt = data.Data.find((c: any) => c.Name === 'Portugal' || c.IsoCode === 'PT');
            console.log('Portugal:', pt);
        } else {
            console.log('Structure preview:', JSON.stringify(data).substring(0, 300));
        }

    } catch (e) {
        console.log('Error:', e.message);
    }
}

getCountries();
