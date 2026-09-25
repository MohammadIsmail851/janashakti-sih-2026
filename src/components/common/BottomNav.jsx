import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, FolderLock, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  if (location.pathname === '/splash' || location.pathname === '/login' || location.pathname === '/digilocker-onboarding') {
    return null;
  }

  const studentNavItems = [
    {
      id: 'home',
      label: t('navHome'),
      icon: LayoutDashboard,
      path: '/home',
    },
    {
      id: 'scholarships',
      label: t('navSchemes'),
      icon: GraduationCap,
      path: '/scholarships',
    },
    {
      id: 'wallet',
      label: t('navWallet'),
      icon: FolderLock,
      path: '/wallet',
    },
    {
      id: 'verification',
      label: t('navVerify'),
      icon: ShieldCheck,
      path: '/verification',
    },
    {
      id: 'chatbot',
      label: t('navChatbot'),
      icon: Sparkles,
      path: '/chatbot',
      special: true,
    },
  ];

  const adminNavItems = [
    {
      id: 'admin',
      label: 'Admin Desk',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      id: 'scholarreach',
      label: 'ScholarReach',
      icon: Sparkles,
      path: '/scholarreach',
      special: true,
    },
    {
      id: 'verification',
      label: 'AISHE Clearing',
      icon: ShieldCheck,
      path: '/verification',
    },
    {
      id: 'profile',
      label: 'MoTA Profile',
      icon: GraduationCap,
      path: '/profile',
    },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav px-3 py-2 pb-safe border-t border-slate-200/80">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/home' && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 haptic-press ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobileTabIndicator"
                  className="absolute inset-0 bg-blue-50/90 rounded-2xl -z-10 border border-blue-100"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-blue-600' : 'text-slate-500'
                  } ${item.special && isActive ? 'text-sky-500' : ''}`}
                />
                {item.special && (
                  <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                )}
              </div>

              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-bold text-blue-600' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
