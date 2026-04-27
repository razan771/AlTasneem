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
    <div className="bg-surface-container-lowest rounded-md overflow-hidden flex flex-col group p-3 hover:shadow-ambient transition-all duration-300 translate-y-0 hover:-translate-y-1">
      <div className="relative aspect-square mb-6 overflow-hidden bg-surface-container-low rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 rounded-[30%_5%_30%_5%]"
        />
        <div className="absolute top-3 right-3 z-10">
          <PetChip label={`مخصص لـ ${product.forPet}`} />
        </div>
      </div>
      <div className="flex-1 px-2 pb-4 flex flex-col">
        <p className="text-xs text-outline font-body mb-2 uppercase tracking-widest">{product.category}</p>
        <h3 className="text-xl font-display font-semibold mb-3 line-clamp-2 text-on-surface leading-tight">{product.name}</h3>
        <p className="text-sm font-body text-on-surface-variant line-clamp-2 mb-6">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-display font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button variant="secondary" onClick={onAddToCart} className="!px-5 !py-2.5 shadow-sm">
            <ShoppingCart size={18} className="ml-2" /> إضافة
          </Button>
        </div>
      </div>
    </div>
  );
}
