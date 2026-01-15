
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const TARGET_ID = '7644225';

async function check() {
    console.log(`Checking Product ID: ${TARGET_ID}...`);
    try {
        const res = await fetch(`https://api.creativehub.io/api/v1/products/${TARGET_ID}`, {
            headers: { 'Authorization': `ApiKey ${API_KEY}` }
        });
        console.log(`Status: ${res.status}`);
        if (res.status === 200) console.log('Exists!');
        else console.log(await res.text());
    } catch (e) { console.log(e.message); }
}

check();
