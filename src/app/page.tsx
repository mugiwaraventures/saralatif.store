import ProductCard from '@/components/ProductCard';
import { products as staticProducts } from '@/data/products';
import { Product } from '@/types';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Load products from JSON file on server-side
function getProducts(): Product[] {
  const PRODUCTS_FILE = join(process.cwd(), 'data', 'products.json');

  try {
    if (existsSync(PRODUCTS_FILE)) {
      const data = JSON.parse(readFileSync(PRODUCTS_FILE, 'utf-8'));
      if (data.products && data.products.length > 0) {
        return data.products;
      }
    }
  } catch (error) {
    console.error('Error reading products file:', error);
  }

  // Fallback to static products
  return staticProducts;
}

export const dynamic = 'force-dynamic';

export default function Home() {
  const products = getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 mb-6">
          Fine Art Prints
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Curated collection of fine art photography. Each print is produced on
          museum-quality Hahnemühle paper, ensuring exceptional detail and longevity.
        </p>
      </section>

      {/* Product Grid */}
      <section>
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Nenhum produto disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section className="mt-24 py-12 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-1">
              Museum Quality
            </h3>
            <p className="text-xs text-gray-500">
              Printed on Hahnemühle Photo Rag 308gsm
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-1">
              Worldwide Shipping
            </h3>
            <p className="text-xs text-gray-500">
              Carefully packaged and tracked delivery
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">✨</div>
            <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-1">
              Limited Editions
            </h3>
            <p className="text-xs text-gray-500">
              Each print numbered and signed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
