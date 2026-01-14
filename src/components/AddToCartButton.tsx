'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isAdded}
            className={`
        w-full py-4 px-8 text-sm tracking-wider uppercase font-medium
        transition-all duration-300
        ${isAdded
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }
      `}
        >
            {isAdded ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                </span>
            ) : (
                'Add to Cart'
            )}
        </button>
    );
}
