import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { api } from '../api';
import type { Product } from '../components/ProductCard';
import { config } from '../config';

interface CheckoutProps {
  items: (Product & { quantity: number })[];
  clearCart: () => void;
}

export function Checkout({ items, clearCart }: CheckoutProps) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('السلة فارغة');
      return;
    }
    if (!customerName || !customerPhone) {
      alert('يرجى إدخال الاسم ورقم التواصل');
      return;
    }

    try {
      if (token) {
        // Save the order to backend before redirecting
        await api.checkout(items, total, 'whatsapp', token);
      }
    } catch {
      console.error('Failed to save order to backend');
    }

    const message = `السلام عليكم، أريد طلب من متجر التسنيم:\n\n🛒 المنتجات:\n` +
      items.map(item => `- ${item.name} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`).join('\n') +
      `\n\n💰 المجموع: $${total.toFixed(2)}\n\n` +
      `👤 الاسم: ${customerName}\n` +
      `📞 رقم التواصل: ${customerPhone}\n` +
      `📍 العنوان: ${customerAddress}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/');
  };

  if(!user || items.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold font-display">السلة فارغة أو غير مسجل دخول</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-8 text-center md:text-start">إتمام الشراء</h1>
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[24px] shadow-ambient">
        <div className="mb-8 border-b border-outline-variant/20 pb-8">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-4">ملخص الطلب</h2>
          {items.map(item => (
             <div key={item.id} className="flex justify-between items-center mb-2">
               <span className="text-sm md:text-base">{item.name} x {item.quantity}</span>
               <span className="font-bold text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</span>
             </div>
          ))}
          <div className="mt-4 pt-4 border-t border-outline-variant/20 flex justify-between text-lg md:text-xl font-bold">
            <span>الإجمالي:</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-4">بيانات التوصيل</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-sm md:text-base">الاسم الكامل *</label>
              <input 
                required 
                type="text" 
                value={customerName} 
                onChange={e => setCustomerName(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none font-body transition-colors"
                placeholder="الاسم الكامل"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-sm md:text-base">رقم التواصل *</label>
              <input 
                required 
                type="tel" 
                value={customerPhone} 
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none font-body dir-ltr text-end transition-colors"
                placeholder="0501234567"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm md:text-base">العنوان التفصيلي</label>
              <textarea 
                value={customerAddress} 
                onChange={e => setCustomerAddress(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none font-body min-h-[100px] transition-colors"
                placeholder="المدينة، الحي، الشارع..."
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 text-base md:text-lg font-bold rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:-translate-y-1 mt-8"
          >
            إتمام الطلب عبر واتساب
          </button>
        </form>
      </div>
    </div>
  );
}
