import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { Button } from '../components/Button';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.register(name, email, password);
      if (res.success) {
        alert('تم إنشاء الحساب بنجاح! الرجاء تسجيل الدخول.');
        navigate('/login');
      } else {
        alert(res.message);
      }
    } catch { alert('Network Error'); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest p-8 rounded-[24px] shadow-ambient max-w-sm w-full">
        <h2 className="text-3xl font-display font-bold mb-6 text-center">مستخدم جديد</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input required type="text" placeholder="الاسم الكامل" value={name} onChange={e => setName(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body" />
          <input required type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body" />
          <input required type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body" />
          <Button type="submit" fullWidth className="mt-2 text-lg">إنشاء حساب</Button>
        </form>
        <p className="mt-6 text-center text-sm font-semibold">لديك حساب بالفعل؟ <Link to="/login" className="text-primary hover:underline">تسجيل الدخول</Link></p>
      </div>
    </div>
  );
}
