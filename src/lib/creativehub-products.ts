import {
    CreativeHubProduct,
    CreativeHubProductsResponse,
    transformCreativeHubProduct
} from '@/types/creativehub';

const CREATIVEHUB_API_URL = process.env.CREATIVEHUB_API_URL || 'https://api.creativehub.io';
const CREATIVEHUB_API_KEY = process.env.CREATIVEHUB_API_KEY;

/**
 * Fetch all products from CreativeHub account
 */
export async function fetchProducts(): Promise<CreativeHubProduct[]> {
    if (!CREATIVEHUB_API_KEY) {
        console.error('CreativeHub API key not configured');
        return [];
    }

    console.log('Fetching products from CreativeHub...');
    console.log('API URL:', CREATIVEHUB_API_URL);
    console.log('API Key length:', CREATIVEHUB_API_KEY.length);

    try {
        const response = await fetch(`${CREATIVEHUB_API_URL}/api/v1/products/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': CREATIVEHUB_API_KEY,
            },
            body: JSON.stringify({
                Page: 1,
                PageSize: 100,
            }),
        });

        console.log('CreativeHub response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('CreativeHub API error:', response.status, errorText);
            return [];
        }

        const data: CreativeHubProductsResponse = await response.json();
        console.log(`Fetched ${data.Total} products from CreativeHub`);

        return data.Data || [];
    } catch (error) {
        console.error('Failed to fetch CreativeHub products:', error);
        return [];
    }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<CreativeHubProduct | null> {
    if (!CREATIVEHUB_API_KEY) {
        console.error('CreativeHub API key not configured');
        return null;
    }

    try {
        const response = await fetch(`${CREATIVEHUB_API_URL}/api/v1/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CREATIVEHUB_API_KEY}`,
            },
        });

        if (!response.ok) {
            console.error('CreativeHub API error:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch CreativeHub product:', error);
        return null;
    }
}

/**
 * Transform CreativeHub products to store format
 * Each print option becomes a separate product
 */
export function transformProducts(
    chProducts: CreativeHubProduct[],
    stripePriceMap?: Record<string, string>
) {
    const products = [];

    for (const chProduct of chProducts) {
        // Skip products without print options
        if (!chProduct.PrintOptions || chProduct.PrintOptions.length === 0) {
            continue;
        }

        // Create a product for each available print option
        for (const printOption of chProduct.PrintOptions) {
            if (!printOption.IsAvailable) continue;

            const sku = `${chProduct.Id}-${printOption.Id}`;
            const stripePriceId = stripePriceMap?.[sku];

            products.push(transformCreativeHubProduct(
                chProduct,
                printOption,
                stripePriceId
            ));
        }
    }

    return products;
}
