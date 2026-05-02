import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, Stethoscope, User } from 'lucide-react';
import { useAuth } from '../AuthContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass shadow-sm border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 group">
              <Stethoscope className="text-primary group-hover:scale-110 transition-transform h-9 w-9" />
              <span className="font-display font-black text-4xl text-gradient-primary tracking-tight">
                التسنيم
              </span>
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-12 space-x-reverse">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl lg:text-2xl font-bold font-body tracking-wide hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-on-surface'
                }`
              }
            >
              الرئيسية
            </NavLink>

            <NavLink
              to="/pharmacy"
              className={({ isActive }) =>
                `text-xl lg:text-2xl font-bold font-body tracking-wide hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-on-surface'
                }`
              }
            >
              الصيدلية
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {user ? (
              <NavLink
                to={user.role === 'admin' ? '/admin' : '/profile'}
                className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors text-on-surface-variant"
              >
                <User size={22} />
                <span className="hidden md:inline line-clamp-1">{user.name}</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors text-on-surface-variant"
              >
                <User size={22} />
                <span className="hidden md:inline">تسجيل الدخول</span>
              </NavLink>
            )}

            <button
              onClick={onOpenCart}
              className="relative p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            >
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-[11px] font-bold text-on-primary bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4 border-2 border-surface">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 text-on-surface">
              <Menu size={26} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
