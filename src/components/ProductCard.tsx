'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500">
                    €{product.price.toFixed(2)}
                </p>
            </div>
        </Link>
    );
}
