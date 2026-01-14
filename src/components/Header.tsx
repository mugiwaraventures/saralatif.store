'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="group">
                    <h1 className="text-2xl font-light tracking-[0.3em] text-gray-900 group-hover:text-gray-600 transition-colors">
                        SARA LATIF
                    </h1>
                    <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase">
                        Fine Art Photography
                    </p>
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/cart"
                        className="relative flex items-center gap-2 text-sm tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}
