import React, { useEffect, useState } from 'react';
import { api } from '../api';
import type { Product } from '../components/ProductCard';
import { Button } from '../components/Button';
import { Trash2, Package, CheckCircle, Edit2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'products'|'orders'>('products');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Product form
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [forPet, setForPet] = useState('');

  useEffect(() => {
    if (user?.role === 'admin' && token) {
      loadProducts();
      loadOrders();
    }
  }, [user, token]);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
  };
  const loadOrders = async () => {
    if(token) {
       const data = await api.getAdminOrders(token);
       setOrders(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.login(username, password);
    if (res.success && res.user.role === 'admin') {
      login(res.token, res.user);
    } else {
      alert('تسجيل الدخول غير صحيح' + ' Invalid login or not admin');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setName(''); setPrice(''); setImage(''); setDescription(''); setCategory(''); setForPet('');
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (editingProduct) {
      await api.updateProduct(editingProduct, { name, price: parseFloat(price), image, description, category, forPet }, token);
    } else {
      await api.addProduct({ name, price: parseFloat(price), image, description, category, forPet }, token);
    }
    handleCancelEdit();
    loadProducts();
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p.id);
    setName(p.name);
    setPrice(String(p.price));
    setImage(p.image);
    setDescription(p.description);
    setCategory(p.category);
    setForPet(p.forPet);
    document.querySelector('.sticky')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDelete = async (id: string) => {
    if(!token) return;
    if(confirm('هل أنت متأكد من الحذف؟')) {
      await api.deleteProduct(id, token);
      loadProducts();
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    if(!token) return;
    await api.updateOrderStatus(id, status, token);
    loadOrders();
  };

  if (!user || user.role !== 'admin' || !token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-surface-container-lowest p-8 rounded-[24px] shadow-ambient max-w-sm w-full">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">دخول الإدارة</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="البريد الإلكتروني" 
              className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body dir-ltr text-end"
              value={username} onChange={e=>setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body dir-ltr text-end"
              value={password} onChange={e=>setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth className="mt-2 text-lg">دخول</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-display font-extrabold text-on-surface">لوحة تحكم الإدارة</h1>
        <Button variant="secondary" onClick={handleLogout}>تسجيل الخروج</Button>
      </div>

      <div className="flex gap-4 mb-8">
        <Button variant={activeTab === 'products' ? 'primary' : 'tertiary'} onClick={()=>setActiveTab('products')}>المنتجات</Button>
        <Button variant={activeTab === 'orders' ? 'primary' : 'tertiary'} onClick={()=>setActiveTab('orders')}>الطلبات الجديدة</Button>
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest p-6 rounded-[24px] shadow-ambient sticky top-24">
              <h3 className="text-2xl font-display font-bold mb-6">
                {editingProduct ? 'تحديث المنتج' : 'إضافة منتج جديد'}
              </h3>
              <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4">
                <input required type="text" placeholder="اسم المنتج" value={name} onChange={e=>setName(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none" />
                <input required type="number" step="0.01" placeholder="السعر ($)" value={price} onChange={e=>setPrice(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none" />
                <input required type="text" placeholder="رابط الصورة الحية" value={image} onChange={e=>setImage(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none" />
                <input required type="text" placeholder="الفئة" value={category} onChange={e=>setCategory(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none" />
                <input required type="text" placeholder="مخصص لـ (مثال: هجن السباق)" value={forPet} onChange={e=>setForPet(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none" />
                <textarea required placeholder="الوصف" value={description} onChange={e=>setDescription(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none min-h-[100px]" />
                <div className="flex gap-2">
                  <Button type="submit" className={`mt-2 ${editingProduct ? 'flex-1 bg-primary text-on-primary' : 'w-full'}`}>
                    {editingProduct ? 'تحديث' : 'إضافة'}
                  </Button>
                  {editingProduct && (
                    <Button type="button" variant="secondary" className="mt-2 flex-1" onClick={handleCancelEdit}>
                      إلغاء
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest rounded-[24px] shadow-ambient overflow-hidden">
              <table className="w-full text-start">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">المنتج</th>
                    <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">السعر</th>
                    <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">الفئة</th>
                    <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 rounded object-cover" alt="" />
                          <span className="font-semibold">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-primary font-bold">${p.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{p.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                            <Edit2 size={20} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="text-error hover:bg-error/10 p-2 rounded-full transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">لا توجد منتجات.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-[24px] shadow-ambient overflow-hidden">
          <table className="w-full text-start">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">الطلب / التاريخ</th>
                <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">العميل</th>
                <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">المنتجات (المجموع)</th>
                <th className="px-6 py-4 text-start font-display font-semibold text-on-surface-variant">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {orders.map(o => (
                <tr key={o.id}>
                  <td className="px-6 py-4">
                    <p className="font-bold">#{o.id}</p>
                    <p className="text-sm text-on-surface-variant dir-ltr text-end">{new Date(o.created_at + 'Z').toLocaleString('ar')}</p>
                    <p className="text-xs mt-1 text-primary">{o.payment_method === 'cash_on_delivery' ? 'دفع عند الاستلام' : 'بطاقة ائتمان'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">{o.user_name}</p>
                    <p className="text-sm text-on-surface-variant">{o.user_email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-display font-bold text-primary mb-1">${o.total.toFixed(2)}</p>
                    <p className="text-sm">{o.items.length} عناصر</p>
                  </td>
                  <td className="px-6 py-4">
                    {o.status === 'pending' ? (
                      <button onClick={()=>handleUpdateStatus(o.id, 'completed')} className="flex items-center gap-2 px-3 py-2 bg-[#fef7e0] text-[#b06000] hover:bg-[#b06000]/20 transition-colors rounded-full text-sm font-bold">
                        <Package size={16}/> قيد المعالجة (تأكيد؟)
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 px-3 py-2 bg-[#e6f4ea] text-[#137333] rounded-full text-sm font-bold w-fit">
                        <CheckCircle size={16}/> مكتمل
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">لا توجد طلبات جديدة.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
