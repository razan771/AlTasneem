import React from 'react';
import { Button } from './Button';
import { PetChip } from './PetChip';
import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  forPet: string;
}

interface ProductCardProps {
  product: Product;


  onAddToCart: () => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col group p-3 hover:shadow-float transition-all duration-300 translate-y-0 hover:-translate-y-2 border border-outline-variant/10">
      <div className="relative aspect-square mb-5 overflow-hidden bg-surface-container-low rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Hover Description Overlay (Desktop Only) */}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-4">
          <p className="text-sm font-body text-surface-container-lowest line-clamp-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="absolute top-3 right-3 z-10">
          <PetChip label={`مخصص لـ ${product.forPet}`} />
        </div>
      </div>
      <div className="flex-1 px-2 pb-2 flex flex-col">
        <p className="text-xs text-outline font-body mb-1.5 uppercase tracking-widest font-bold">{product.category}</p>
        <h3 className="text-lg lg:text-xl font-display font-bold mb-4 line-clamp-2 text-on-surface leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
          <span className="text-2xl font-display font-black text-primary">${product.price.toFixed(2)}</span>
          <Button variant="primary" onClick={onAddToCart} className="!px-4 !py-2.5 !rounded-xl shadow-md text-sm">
            <ShoppingCart size={18} className="ml-1.5" /> إضافة
          </Button>
        </div>
      </div>
    </div>
  );
}
