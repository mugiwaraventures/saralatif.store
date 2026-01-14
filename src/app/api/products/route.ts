import { NextResponse } from 'next/server';
import { fetchProducts, transformProducts } from '@/lib/creativehub-products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/products
 * Fetches products from CreativeHub and returns them in store format
 */
export async function GET() {
    try {
        // Fetch products from CreativeHub
        const chProducts = await fetchProducts();

        if (chProducts.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No products found or API not configured',
                products: [],
            });
        }

        // Transform to store format
        const products = transformProducts(chProducts);

        return NextResponse.json({
            success: true,
            total: products.length,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
