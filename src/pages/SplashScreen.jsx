import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, ChevronRight, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleEnterApp = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-10 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="pt-6 flex justify-between items-center z-10 max-w-md mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <span className="text-xs font-bold text-amber-300">MoTA</span>
          </div>
          <span className="text-xs font-medium text-blue-200">
            {t('ministryName')}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
          {t('sihTag')}
        </span>
      </div>

      {/* Hero Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-auto text-center flex flex-col items-center z-10 max-w-md mx-auto w-full"
      >
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-sky-500 to-amber-400 flex items-center justify-center shadow-2xl shadow-blue-500/50 border-2 border-white/30">
            <span className="text-4xl font-extrabold text-white tracking-tighter">
              JS
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-slate-900">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
          {t('portalName')}
        </h1>
        <p className="text-sm font-semibold text-sky-300 mt-1 uppercase tracking-widest">
          జనశక్తి • जनशक्ति • JanaShakti
        </p>

        <p className="text-sm text-slate-300 mt-4 max-w-xs leading-relaxed">
          {t('portalTagline')}
        </p>

        {/* Feature Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-xs">
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 flex items-center">
            <Sparkles className="w-3 h-3 text-amber-300 mr-1.5" />
            5 MoTA Central Schemes
          </span>
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 flex items-center">
            <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1.5" />
            Direct Benefit Transfer (DBT)
          </span>
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 flex items-center">
            <Award className="w-3 h-3 text-sky-400 mr-1.5" />
            DigiLocker & APAAR Synced
          </span>
        </div>
      </motion.div>

      {/* Action Footer */}
      <div className="pb-4 z-10 space-y-3 max-w-md mx-auto w-full">
        <button
          onClick={handleEnterApp}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-blue-500/30 transition-all haptic-press"
        >
          <span>Get Started • Secure Portal</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="text-center text-[10px] text-slate-400">
          Integrated with National Scholarship Portal (NSP) & PFMS
        </div>
      </div>
    </div>
  );
};
