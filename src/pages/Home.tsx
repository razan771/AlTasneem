import React from 'react';
import { Button } from '../components/Button';
import { NavLink } from 'react-router-dom';
import { BadgeCheck, Pill, Syringe, PawPrint } from 'lucide-react';

const features = [
  {
    icon: BadgeCheck,
    title: 'وصفات موثوقة',
    description: 'خلاصة الخبرة في وصفات طبية دقيقة وموثوقة تحت إشراف طبيب مختص',
    glowColor: 'from-blue-500 to-cyan-500',
    iconColor: 'text-cyan-400'
  },
  {
    icon: Pill,
    title: 'مكملات غذائية',
    description: 'تغذية ذكية، نتائج مبهرة.. مكملات غذائية طبيعية تدعم الصحة العامة والنشاط',
    glowColor: 'from-emerald-500 to-teal-500',
    iconColor: 'text-emerald-400'
  },
  {
    icon: Syringe,
    title: 'علاجات بيطرية',
    description: 'نوفر لك أفضل العلاجات البيطرية من كبرى الشركات العالمية لضمان الشفاء السريع',
    glowColor: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400'
  },
  {
    icon: PawPrint,
    title: 'علاجات الهجن',
    description: 'حلول علاجية متكاملة لضمان جهوزية الهجن لأقوى الميادين',
    glowColor: 'from-blue-500 to-indigo-500',
    iconColor: 'text-blue-400'
  }
];

const stats = [
  { value: '6+', label: 'أبطال السباق' },
  { value: '500+', label: 'وصفة طبية' },
  { value: '5+', label: 'سنوات من الخبرة' }
];

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-10 md:py-8 sm:px-6 lg:px-8 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8 lg:gap-16 h-auto min-h-[calc(100vh-6rem)] w-full overflow-hidden md:overflow-visible">
        <div className="flex-1 text-center md:text-start z-10 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-6 md:mb-8 leading-[1.3] md:leading-[1.2] text-on-surface">
            رعاية بيطرية متكاملة
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 md:mt-6 text-gradient-primary leading-normal pb-4 font-bold">لجميع الحيوانات</span>
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed tracking-wide">
            رعاية صحية مختارة بخبرة ومصممة لضمان صحة وقوة هجنك ورفاهية حيواناتك الأليفة، ضمن بيئة طبية متكاملة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
            <NavLink to="/pharmacy">
              <Button className="text-base sm:text-lg px-8 py-4 shadow-float tracking-wide">تصفح المنتجات</Button>
            </NavLink>
            <Button variant="secondary" className="text-base sm:text-lg px-8 py-4 tracking-wide shadow-soft">استشارة طبية</Button>
          </div>
        </div>
        <div className="flex-1 relative w-full flex justify-center md:justify-end items-center mt-6 md:mt-0">
          <div className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[440px] isolate">
            {/* Background Dog Image - Layer 1 (Back top right) */}
            <div className="hidden md:block absolute -z-20 -top-6 -right-6 lg:-top-10 lg:-right-14 w-2/3 aspect-[4/5] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] shadow-ambient opacity-[0.6] blur-sm rotate-6 transform transition-transform hover:rotate-3 duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 mix-blend-overlay" />
              <img src="/images/hero-dog.png" alt="Clinical Dog Sanctuary" className="object-cover w-full h-full" />
            </div>

            {/* Background Cat Image - Layer 2 (Back bottom left) */}
            <div className="hidden md:block absolute -z-10 -bottom-6 -left-6 lg:-bottom-12 lg:-left-12 w-3/5 aspect-[4/5] overflow-hidden rounded-[1rem_2rem_1rem_2rem] shadow-ambient opacity-[0.7] rotate-[-8deg] blur-[2px] transform transition-transform hover:rotate-[-4deg] duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10 mix-blend-overlay" />
              <img src="/images/hero-cat.png" alt="Clinical Cat Sanctuary" className="object-cover w-full h-full" />
            </div>

            {/* Foreground Camel Image - Main Focal Point */}
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] md:rounded-3xl bg-surface-container-low shadow-float ring-1 ring-white/40">
              <img
                src="/images/hero-camel.png"
                alt="Premium Camel Racing at Sunset"
                className="object-cover w-full h-full scale-[1.01] hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            {/* Decorative elements behind */}
            <div className="hidden md:block absolute -z-30 top-8 -left-8 lg:top-12 lg:-left-12 w-full h-full rounded-3xl border border-outline-variant/30"></div>
          </div>
        </div>
      </section>

      {/* Features & Stats Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer p-4 md:p-6 rounded-2xl hover:border-outline-variant/30 hover:bg-surface-container-low/50 border border-transparent transition-all duration-300">
              <div className="relative mb-6">
                {/* Abstract shape glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.glowColor} blur-[24px] opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full scale-[1.6]`} />
                
                {/* Floating Icon */}
                <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-300 p-2">
                  <feature.icon strokeWidth={1.5} className={`w-12 h-12 md:w-14 md:h-14 ${feature.iconColor} drop-shadow-md`} />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-on-surface mb-3 md:mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-10 md:py-14 px-6 rounded-[24px] bg-surface-container bg-opacity-40 border border-outline-variant/10 hover:bg-surface-container-low transition-colors duration-300 text-center">
              <div className="mb-4 relative inline-block">
                <span className="text-5xl md:text-6xl font-display font-bold text-on-surface z-10 relative tracking-wide">
                  {stat.value}
                </span>
                <div className="absolute bottom-[4px] md:bottom-[8px] right-0 translate-x-[15%] w-[80%] h-[12px] bg-primary z-0 opacity-80" />
              </div>
              <span className="font-body text-base lg:text-lg font-medium text-on-surface-variant mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Content */}
      <section className="bg-surface-container-low py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight tracking-tight">
            أعلى معايير الرعاية، تليق بأصالة حيواناتك.
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto tracking-wide leading-relaxed">
            الصيدلية البيطرية الرائدة المتخصصة في سباقات الهجن والحيوانات الأليفة. نوفر أحدث الحلول العلاجية والمكملات الغذائية عالية الجودة لدعم صحة حيواناتك.
          </p>
        </div>
      </section>
    </div>
  );
}
