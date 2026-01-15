
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.CREATIVEHUB_API_KEY;
const PRODUCT_ID = '7644225';
const TARGET_PRINT_OPTION = '2436455';

async function check() {
    console.log(`Checking PrintOption Details for ${TARGET_PRINT_OPTION}...`);
    try {
        const res = await fetch(`https://api.creativehub.io/api/v1/products/${PRODUCT_ID}`, {
            headers: { 'Authorization': `ApiKey ${API_KEY}` }
        });

        if (res.status === 200) {
            const data = await res.json();
            const opt = data.PrintOptions.find((o: any) => String(o.Id) === TARGET_PRINT_OPTION);
            if (opt) {
                console.log('--- Option JSON ---');
                console.log(JSON.stringify(opt, null, 2));
            } else {
                console.log('Option not found');
            }
        }
    } catch (e) { console.log(e.message); }
}

check();
