'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert('Failed to initiate checkout. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to initiate checkout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <div className="text-6xl mb-6">🛒</div>
                <h1 className="text-2xl font-light tracking-wide text-gray-900 mb-4">
                    Your cart is empty
                </h1>
                <p className="text-gray-500 mb-8">
                    Discover our collection of fine art prints.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                    Browse Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-12">
                Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>

            <div className="space-y-8">
                {items.map(({ product, quantity }) => (
                    <div
                        key={product.id}
                        className="flex gap-6 pb-8 border-b border-gray-100"
                    >
                        {/* Image */}
                        <div className="relative w-32 h-40 flex-shrink-0 bg-gray-100 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="128px"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                                >
                                    {product.title}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">
                                    {product.creativeHubSettings.size} • {product.creativeHubSettings.paperId}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center text-sm">{quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Price & Remove */}
                                <div className="flex items-center gap-6">
                                    <span className="text-lg text-gray-900">
                                        €{(product.price * quantity).toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => removeItem(product.id)}
                                        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg text-gray-600">Subtotal</span>
                    <span className="text-2xl font-medium text-gray-900">
                        €{totalPrice.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Shipping and taxes calculated at checkout.
                </p>

                <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full py-4 bg-gray-900 text-white text-sm tracking-wider uppercase font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <Link
                    href="/"
                    className="block text-center mt-4 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    ← Continue Shopping
                </Link>
            </div>
        </div>
    );
}
