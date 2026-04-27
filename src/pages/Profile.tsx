import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Package } from 'lucide-react';

export function Profile() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    api.getUserOrders(token).then(setOrders).catch(console.error);
  }, [user, token, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-surface-container-lowest p-8 rounded-[24px] shadow-ambient mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">مرحباً، {user.name}</h1>
          <p className="text-on-surface-variant mt-2">{user.email}</p>
        </div>
        <Button variant="secondary" onClick={() => { logout(); navigate('/'); }}>تسجيل الخروج</Button>
      </div>

      <h2 className="text-2xl font-display font-bold mb-6">سجل طلباتي</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-[24px]">
          <Package className="mx-auto h-16 w-16 text-on-surface-variant opacity-50 mb-4" />
          <p className="text-lg text-on-surface-variant">لم تقم بأي طلبات بعد.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-surface-container-lowest rounded-[24px] shadow-sm overflow-hidden border border-outline-variant/30">
              <div className="bg-surface-container-low px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="font-semibold block">طلب #{order.id}</span>
                  <span className="text-sm text-on-surface-variant text-start dir-ltr inline-block mt-1">{new Date(order.created_at + "Z").toLocaleString()}</span>
                </div>
                <div className="text-end">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-[#fef7e0] text-[#b06000]'}`}>
                    {order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                  </span>
                  <p className="text-lg font-bold text-primary mt-2">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {order.items.map((item: any) => (
                    <li key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-on-surface-variant text-sm mt-1">الكمية: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
