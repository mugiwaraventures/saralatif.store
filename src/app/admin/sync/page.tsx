'use client';

import { useState } from 'react';

interface SyncResult {
    success: boolean;
    total?: number;
    products?: Array<{
        id: string;
        title: string;
        price: number;
        currency: string;
        image: string;
    }>;
    generatedCode?: string;
    error?: string;
}

export default function AdminSyncPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SyncResult | null>(null);

    const handleSync = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/products/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                success: false,
                error: 'Failed to connect to server',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                success: false,
                error: 'Failed to fetch products',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-8">
                Admin: Sync CreativeHub Products
            </h1>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Configuration Check
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Make sure you have set <code className="bg-gray-200 px-1 rounded">CREATIVEHUB_API_KEY</code> in your <code className="bg-gray-200 px-1 rounded">.env.local</code> file.
                </p>
                <p className="text-sm text-gray-500">
                    Get your API key from{' '}
                    <a
                        href="https://app.creativehub.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        CreativeHub Dashboard
                    </a>
                    {' → Account → API Keys'}
                </p>
            </div>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={handleFetch}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-200 text-gray-800 text-sm tracking-wider uppercase hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Preview Products'}
                </button>

                <button
                    onClick={handleSync}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Syncing...' : 'Sync & Generate Code'}
                </button>
            </div>

            {result && (
                <div className="space-y-6">
                    {/* Status */}
                    <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {result.success ? (
                            <p>✅ Found {result.total} products from CreativeHub</p>
                        ) : (
                            <p>❌ Error: {result.error}</p>
                        )}
                    </div>

                    {/* Products Preview */}
                    {result.products && result.products.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Products Preview
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {result.products.map((product) => (
                                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full aspect-square object-cover rounded mb-3"
                                        />
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {product.title}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {product.currency} {product.price.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Generated Code */}
                    {result.generatedCode && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Generated Code
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Copy this to <code className="bg-gray-200 px-1 rounded">src/data/products.ts</code>:
                            </p>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                                {result.generatedCode}
                            </pre>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(result.generatedCode || '');
                                    alert('Copied to clipboard!');
                                }}
                                className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
