import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts, transformProducts } from '@/lib/creativehub-products';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * POST /api/products/sync
 * Fetches products from CreativeHub and generates a products.ts file
 * This is useful for one-time sync or manual refresh
 */
export async function POST(request: NextRequest) {
    try {
        // Optional: Get Stripe price mappings from request body
        const body = await request.json().catch(() => ({}));
        const stripePriceMap = body.stripePriceMap || {};

        // Fetch products from CreativeHub
        const chProducts = await fetchProducts();

        if (chProducts.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No products found. Make sure CREATIVEHUB_API_KEY is configured.',
            }, { status: 400 });
        }

        // Transform to store format
        const products = transformProducts(chProducts, stripePriceMap);

        // Generate TypeScript file content
        const fileContent = `// Auto-generated from CreativeHub API
// Generated at: ${new Date().toISOString()}
// Total products: ${products.length}

import { Product } from '@/types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
`;

        // Write to file
        try {
            const filePath = join(process.cwd(), 'src', 'data', 'products.ts');
            writeFileSync(filePath, fileContent, 'utf-8');
            console.log('Successfully wrote products to:', filePath);
        } catch (writeError) {
            console.error('Error writing products file:', writeError);
            throw new Error('Failed to write products file');
        }

        return NextResponse.json({
            success: true,
            message: 'Products synced successfully',
            total: products.length,
            products,
            generatedCode: fileContent,
        });
    } catch (error) {
        console.error('Error syncing products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to sync products' },
            { status: 500 }
        );
    }
}
