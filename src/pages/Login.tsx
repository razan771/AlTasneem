import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { Button } from '../components/Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      if (res.success) {
        login(res.token, res.user);
        if(res.user.role === 'admin') navigate('/admin');
        else navigate('/profile');
      } else {
        alert(res.message || 'تسجيل الدخول غير صحيح');
      }
    } catch (err) {
      alert('Network Error');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest p-8 rounded-[24px] shadow-ambient max-w-sm w-full">
        <h2 className="text-3xl font-display font-bold mb-6 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input required type="text" placeholder="البريد الإلكتروني" value={email} onChange={e=>setEmail(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body" />
          <input required type="password" placeholder="كلمة المرور" value={password} onChange={e=>setPassword(e.target.value)} className="px-4 py-3 bg-surface-container-low ghost-border rounded-lg outline-none font-body" />
          <Button type="submit" fullWidth className="mt-2 text-lg">دخول</Button>
        </form>
        <p className="mt-6 text-center text-sm font-semibold">ليس لديك حساب؟ <Link to="/register" className="text-primary hover:underline">مستخدم جديد</Link></p>
      </div>
    </div>
  );
}
