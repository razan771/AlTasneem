import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Button } from './Button';
import type { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50 transition-opacity" 
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-container-lowest shadow-ambient transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 bg-surface-container-low/50">
          <h2 className="text-2xl font-display font-bold tracking-tight">سلة المشتريات</h2>
          <button onClick={onClose} className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-full hover:bg-surface-container-highest">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant">
              <p className="text-lg font-body">سلة المشتريات فارغة.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-surface-container-low rounded-md">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                <div className="flex-1 flex flex-col">
                  <h4 className="font-display font-semibold line-clamp-1">{item.name}</h4>
                  <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-surface-container-lowest rounded-full ghost-border overflow-hidden">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-surface-container-highest transition-colors disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                      <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-surface-container-highest transition-colors">+</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-surface-container-lowest shadow-[0_-10px_40px_rgba(0,31,42,0.05)] border-t border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-body text-on-surface-variant">المجموع الفرعي</span>
              <span className="font-display text-2xl font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <Button fullWidth variant="primary" className="py-4 text-lg" onClick={onCheckout}>إتمام الشراء</Button>
          </div>
        )}
      </div>
    </>
  );
}
