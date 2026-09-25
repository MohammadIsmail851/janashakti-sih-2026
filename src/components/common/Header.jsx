import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Globe, Sparkles, ChevronDown, Check, ShieldCheck, Search, ShieldAlert, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useScholarship } from '../../context/ScholarshipContext';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isAdmin, logout } = useAuth();
  const { unreadNotifsCount } = useNotifications();
  const { student } = useScholarship();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  if (location.pathname === '/splash' || location.pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full glass-header px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity with Emblem */}
        <div 
          onClick={() => navigate(isAdmin ? '/admin' : '/home')} 
          className="flex items-center space-x-2.5 cursor-pointer haptic-press select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-lg">
            <span className="tracking-tighter">JS</span>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                {t('portalName')}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-800 rounded-full">
                {isAdmin ? 'Admin' : 'MoTA'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{t('portalTagline')}</span>
            </div>
          </div>
        </div>

        {/* Center: Live Sync Pill on desktop */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t('syncedNsp')}</span>
        </div>

        {/* Right: Actions (Language, Notifications, Profile) */}
        <div className="flex items-center space-x-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold haptic-press border border-slate-200/80"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                  Select Language / भाषा
                </div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-blue-50 transition-colors ${
                      language === lang.code ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.native}</span>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors haptic-press"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Profile / Role Nav */}
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-xl ring-2 ring-blue-500/30 overflow-hidden cursor-pointer haptic-press focus:outline-none"
            aria-label="Student Profile"
          >
            <img
              src={currentUser?.avatar || student.avatar}
              alt={currentUser?.name || student.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
