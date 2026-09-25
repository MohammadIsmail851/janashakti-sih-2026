import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  FolderLock, 
  CreditCard, 
  HelpCircle, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';
import { formatCurrency } from '../utils/formatters';

// Premium Visual Components
import { FloatingShapes } from '../components/ui/FloatingShapes';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { GradientHeading } from '../components/ui/GradientHeading';
import { SectionReveal } from '../components/ui/SectionReveal';
import { StatCounter } from '../components/ui/StatCounter';
import { AnimatedProgress } from '../components/ui/AnimatedProgress';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    student, 
    schemes, 
    verifications, 
    setIsScanningModalOpen,
    simulateAisheVerification
  } = useScholarship();
  const { showToast } = useNotifications();

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const activeScheme = schemes.find(s => s.id === student.activeSchemeId) || schemes[0];
  const aisheStage = verifications.find(v => v.id === 'aishe');
  const isAishePending = aisheStage?.status === 'Pending';

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 700));
    setIsRefreshing(false);
    showToast(t('syncedNsp'), 'success');
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative Geometric Elements */}
      <FloatingShapes />

      <div className="max-w-7xl mx-auto space-y-5 relative z-10">
        
        {/* Top Sync & Status Bar */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">{t('syncedNsp')}</span>
            <span className="sm:hidden">NSP Synced</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/80 hover:bg-blue-100 transition-all haptic-press shadow-xs"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : t('syncLive')}</span>
          </button>
        </div>

        {/* HERO GREETING & PROFILE READINESS BANNER */}
        <SectionReveal delay={0.05}>
          <div className="bg-white/90 backdrop-blur-md rounded-card p-5 sm:p-6 shadow-soft border border-slate-200/80 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {t('greeting')} 🙏
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {student.subTribe} {student.category}
                  </span>
                </div>
                
                {/* Gradient Animated Heading */}
                <GradientHeading 
                  text={student.name}
                  as="h1"
                  animateLetters={false}
                  className="text-2xl sm:text-3xl mt-1"
                />
                
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {student.course} • {student.institute}
                </p>
              </div>

              {/* Profile Index Metric */}
              <div 
                onClick={() => navigate('/profile')} 
                className="flex items-center space-x-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 cursor-pointer hover:bg-blue-50/50 transition-colors haptic-press"
              >
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{t('profileReadiness')}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{t('docsSynced')}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex flex-col items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/25">
                  {student.profileCompletion}%
                </div>
              </div>
            </div>

            {/* Smooth Animated Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <AnimatedProgress percent={student.profileCompletion} />
            </div>
          </div>
        </SectionReveal>

        {/* PENDING VERIFICATION ALERT (If AISHE is pending) */}
        {isAishePending && (
          <SectionReveal delay={0.1}>
            <div className="p-4 sm:p-5 rounded-card bg-amber-50/90 border border-amber-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      {t('actionRequired')} • {t('stage')} 4 of 5
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                      AISHE Node Pending
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 font-medium mt-1 leading-snug max-w-2xl">
                    NIT Rourkela Scholarship Desk is reviewing Semester VI regular attendance for Tranche 2 disbursal.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={simulateAisheVerification}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 haptic-press flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('simulateNodal')}</span>
                </button>
                <button
                  onClick={() => navigate('/verification')}
                  className="px-3.5 py-2 rounded-xl bg-white text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-100/50 haptic-press"
                >
                  {t('verifyFlow')}
                </button>
              </div>
            </div>
          </SectionReveal>
        )}

        {/* RESPONSIVE GRID LAYOUT FOR DESKTOP & MOBILE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT COLUMN: ACTIVE SCHOLARSHIP & SCHEME EXPLORATION (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* ACTIVE SCHOLARSHIP CARD (CRED style highlight with animated numbers) */}
            <SectionReveal delay={0.15}>
              <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-card p-5 sm:p-6 text-white shadow-soft-lg relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] tracking-wider uppercase backdrop-blur-sm">
                      {t('activeScheme')}
                    </span>
                    <span className="text-[11px] text-blue-100 font-mono font-semibold">
                      {activeScheme.code}
                    </span>
                  </div>
                  <span className="flex items-center text-[11px] font-bold text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {activeScheme.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                    {activeScheme.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100/90 mt-1 leading-relaxed">
                    {activeScheme.subtitle}
                  </p>
                </div>

                {/* Animated Financial Counter Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-5 p-4 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-blue-200">
                      {t('totalSanctioned')}
                    </div>
                    <div className="text-2xl font-extrabold text-white mt-0.5">
                      <StatCounter targetValue={student.sanctionTotal} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-300">
                      {t('disbursedDbt')}
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                      <StatCounter targetValue={student.dbtDisbursed} />
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-5 flex items-center justify-between pt-2">
                  <div className="text-xs text-blue-100 flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="truncate max-w-[280px] sm:max-w-md">{activeScheme.nextAction}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/scholarships/${activeScheme.id}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs haptic-press transition-colors flex items-center space-x-1"
                  >
                    <span>{t('viewDetails')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SectionReveal>

            {/* ALL 5 SCHEMES PREVIEW CARDS */}
            <SectionReveal delay={0.2}>
              <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      {t('exploreSchemes')}
                    </h3>
                    <p className="text-xs text-slate-400">Centrally Sponsored Schemes for ST Scholars</p>
                  </div>
                  <button
                    onClick={() => navigate('/scholarships')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center haptic-press"
                  >
                    <span>{t('viewAll')}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {schemes.slice(1, 5).map((scheme, idx) => (
                    <AnimatedCard
                      key={scheme.id}
                      delay={idx * 0.05}
                      onClick={() => navigate(`/scholarships/${scheme.id}`)}
                      className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/50 border border-slate-200/70 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-mono font-bold text-slate-500">{scheme.code}</span>
                          <span className="px-2 py-0.5 rounded-full font-bold bg-white text-slate-700 border border-slate-200">
                            {scheme.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {scheme.name}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-blue-700">
                          {scheme.sanctionFormatted}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </SectionReveal>

          </div>

          {/* RIGHT COLUMN: QUICK ACTIONS, DBT STATUS, HELPLINE (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* LATEST DBT CREDIT CARD */}
            <SectionReveal delay={0.15}>
              <AnimatedCard 
                onClick={() => navigate('/dbt')}
                className="p-4 sm:p-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {t('latestDbtCredit')}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        SBI ••••4821 • APBS
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-emerald-600 font-['Plus_Jakarta_Sans',sans-serif]">
                      +₹62,500
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">
                      14 Jan 2026
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-blue-600 font-bold">
                  <span>{t('dbtTitle')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </AnimatedCard>
            </SectionReveal>

            {/* QUICK ACTIONS GRID */}
            <SectionReveal delay={0.2}>
              <div className="bg-white rounded-card p-4 sm:p-5 border border-slate-200/80 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('quickActions')}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">{t('selfService')}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => navigate('/wallet')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/60 transition-all haptic-press"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5">
                      <FolderLock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 text-center">
                      {t('navWallet')}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsScanningModalOpen(true)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/60 transition-all haptic-press"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-1.5">
                      <Scan className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 text-center">
                      {t('aiScan')}
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/verification')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200/60 transition-all haptic-press"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-1.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 text-center">
                      {t('verifyFlow')}
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/chatbot')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200/60 transition-all haptic-press"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-1.5 relative">
                      <Sparkles className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 text-center">
                      {t('navChatbot')}
                    </span>
                  </button>
                </div>
              </div>
            </SectionReveal>

            {/* HELPLINE BANNER */}
            <SectionReveal delay={0.25}>
              <div className="p-4 rounded-card bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-soft">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold">{t('helplineTitle')}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{t('helplineDesc')}</div>
                    <button
                      onClick={() => showToast("Calling MoTA National Tribal Grievance Cell (Simulated 1800-11-7777)...", "info")}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 haptic-press flex items-center space-x-1"
                    >
                      <span>{t('callNow')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </SectionReveal>

          </div>

        </div>

      </div>
    </div>
  );
};
