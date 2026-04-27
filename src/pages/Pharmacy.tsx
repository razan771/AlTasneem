import React from 'react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import { products } from '../data/products';

interface PharmacyProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function Pharmacy({ products, onAddToCart }: PharmacyProps) {
  return (
    <div className="min-h-screen pb-24">
      {/* Header Area */}
      <div className="bg-surface-container-lowest pt-16 pb-24 px-4 sm:px-6 lg:px-8 shadow-ambient relative z-10 mb-[-40px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-extrabold text-on-surface mb-4">الصيدلية</h1>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg">
            علاجات معتمدة ورعاية مخصصة لصحة هجنك.
          </p>
        </div>
      </div>

      {/* Products Grid (Asymmetrical) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start pt-8">
          {products.map((product, index) => (
            <div key={product.id} className={index % 2 === 1 ? 'md:mt-16' : ''}>
              <ProductCard
                product={product}
                onAddToCart={() => onAddToCart(product)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
