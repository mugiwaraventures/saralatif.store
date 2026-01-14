import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Product } from '@/types';

const DATA_DIR = join(process.cwd(), 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');

// Ensure data directory exists
function ensureDataDir() {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
}

// Read products from JSON file
function readProducts(): Product[] {
    ensureDataDir();
    if (!existsSync(PRODUCTS_FILE)) {
        writeFileSync(PRODUCTS_FILE, JSON.stringify({ products: [], lastUpdated: null }));
        return [];
    }
    try {
        const data = JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8'));
        return data.products || [];
    } catch {
        return [];
    }
}

// Write products to JSON file
function writeProducts(products: Product[]) {
    ensureDataDir();
    const data = {
        products,
        lastUpdated: new Date().toISOString(),
    };
    writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
}

// GET - List all products
export async function GET() {
    const products = readProducts();
    return NextResponse.json({
        success: true,
        total: products.length,
        products,
    });
}

// POST - Add new product
export async function POST(request: NextRequest) {
    try {
        const newProduct: Product = await request.json();

        // Validate required fields
        if (!newProduct.title || !newProduct.price) {
            return NextResponse.json(
                { success: false, error: 'Title and price are required' },
                { status: 400 }
            );
        }

        // Generate ID if not provided
        if (!newProduct.id) {
            newProduct.id = `product-${Date.now()}`;
        }

        const products = readProducts();
        products.push(newProduct);
        writeProducts(products);

        return NextResponse.json({
            success: true,
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add product' },
            { status: 500 }
        );
    }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
    try {
        const updatedProduct: Product = await request.json();

        if (!updatedProduct.id) {
            return NextResponse.json(
                { success: false, error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const products = readProducts();
        const index = products.findIndex(p => p.id === updatedProduct.id);

        if (index === -1) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        products[index] = updatedProduct;
        writeProducts(products);

        return NextResponse.json({
            success: true,
            product: updatedProduct,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const products = readProducts();
        const filteredProducts = products.filter(p => p.id !== id);

        if (filteredProducts.length === products.length) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        writeProducts(filteredProducts);

        return NextResponse.json({
            success: true,
            message: 'Product deleted',
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
