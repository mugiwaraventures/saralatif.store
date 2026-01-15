
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

async function getCountries() {
    console.log('Fetching Countries...');
    const API_KEY = process.env.CREATIVEHUB_API_KEY; // Use key just in case, usually public

    try {
        const res = await fetch('https://api.creativehub.io/api/v1/countries', {
            headers: { 'Authorization': `ApiKey ${API_KEY}` }
        });

        console.log(`Status: ${res.status}`);
        if (res.status === 200) {
            const data = await res.json();
            console.log('Count:', data.length);
            // Find Portugal
            const pt = data.find((c: any) => c.Name === 'Portugal' || c.Code === 'PT' || c.IsoCode === 'PT');
            console.log('Portugal Entry:', pt);

            // Print first few to see schema
            console.log('Sample:', data.slice(0, 3));
        } else {
            console.log(await res.text());
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}

getCountries();
