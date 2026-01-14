'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

const PAPER_OPTIONS = [
    'Hahnemühle Photo Rag 308',
    'Hahnemühle Photo Rag Baryta 315',
    'Hahnemühle German Etching 310',
    'Hahnemühle Photo Glossy 260',
    'Canson Platine Fibre Rag 310',
];

const SIZE_OPTIONS = [
    'A4 (21x29.7cm)',
    'A3 (29.7x42cm)',
    'A2 (42x59.4cm)',
    'A1 (59.4x84.1cm)',
    '30x40cm',
    '40x50cm',
    '50x70cm',
    '60x80cm',
    '70x100cm',
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        currency: 'EUR',
        image: '',
        priceId: '',
        sku: '',
        paper: PAPER_OPTIONS[0],
        size: SIZE_OPTIONS[0],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const product: Product = {
            id: editingProduct?.id || `product-${Date.now()}`,
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            currency: formData.currency,
            image: formData.image || '/images/placeholder.jpg',
            priceId: formData.priceId || 'price_NEEDS_STRIPE_ID',
            creativeHubSettings: {
                sku: formData.sku,
                paperId: formData.paper,
                size: formData.size,
            },
        };

        try {
            const method = editingProduct ? 'PUT' : 'POST';
            const res = await fetch('/api/admin/products', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                await fetchProducts();
                resetForm();
            }
        } catch (error) {
            console.error('Failed to save product:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            currency: product.currency,
            image: product.image,
            priceId: product.priceId,
            sku: product.creativeHubSettings.sku,
            paper: product.creativeHubSettings.paperId,
            size: product.creativeHubSettings.size,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;

        try {
            await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
            await fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            currency: 'EUR',
            image: '',
            priceId: '',
            sku: '',
            paper: PAPER_OPTIONS[0],
            size: SIZE_OPTIONS[0],
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-12">
                <p className="text-gray-500">Carregando produtos...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-light tracking-wide text-gray-900">
                    Gerenciar Produtos
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
                >
                    + Adicionar Produto
                </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h2 className="text-2xl font-light mb-6">
                            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Ex: The Look - Fine Art Print"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descrição
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Descrição do produto..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preço *
                                    </label>
                                    <div className="flex">
                                        <select
                                            value={formData.currency}
                                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                            className="px-3 py-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50"
                                        >
                                            <option value="EUR">€</option>
                                            <option value="USD">$</option>
                                            <option value="GBP">£</option>
                                        </select>
                                        <input
                                            type="number"
                                            required
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:outline-none focus:border-gray-400"
                                            placeholder="99.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL da Imagem
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="/images/produto.jpg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tamanho
                                    </label>
                                    <select
                                        value={formData.size}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                    >
                                        {SIZE_OPTIONS.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Papel
                                    </label>
                                    <select
                                        value={formData.paper}
                                        onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                    >
                                        {PAPER_OPTIONS.map((paper) => (
                                            <option key={paper} value={paper}>{paper}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        SKU (CreativeHub)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.sku}
                                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="SKU do produto no CreativeHub"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stripe Price ID
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.priceId}
                                        onChange={(e) => setFormData({ ...formData, priceId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="price_xxxxx"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 text-sm tracking-wider uppercase hover:bg-gray-50 transition-colors rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 bg-gray-900 text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors rounded-lg disabled:opacity-50"
                                >
                                    {saving ? 'Salvando...' : 'Salvar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products List */}
            {products.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">Nenhum produto cadastrado</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-gray-900 underline hover:no-underline"
                    >
                        Adicionar primeiro produto
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="aspect-square bg-gray-100 relative">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    {product.creativeHubSettings.size} • {product.creativeHubSettings.paperId}
                                </p>
                                <p className="text-lg font-medium text-gray-900 mb-4">
                                    {product.currency === 'EUR' ? '€' : product.currency} {product.price.toFixed(2)}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 py-2 border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-4 py-2 border border-red-300 text-red-600 text-sm hover:bg-red-50 transition-colors rounded"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info Box */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">💡 Dica</h3>
                <p className="text-sm text-blue-800">
                    Para cada produto, você precisa do <strong>SKU do CreativeHub</strong> (encontrado na tabela de produtos)
                    e do <strong>Stripe Price ID</strong> (criado no dashboard do Stripe). O SKU é usado para
                    enviar pedidos automaticamente para o CreativeHub para impressão.
                </p>
            </div>
        </div>
    );
}
