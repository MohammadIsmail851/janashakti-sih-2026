import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Landmark, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';
import { formatCurrency } from '../utils/formatters';

export const DbtTimelineScreen = () => {
  const { t } = useLanguage();
  const { 
    dbtTimeline, 
    student, 
    verifications, 
    disburseTranche2 
  } = useScholarship();
  const { showToast } = useNotifications();

  const isAisheVerified = verifications.find(v => v.id === 'aishe')?.status === 'Verified';
  const isTranche2Credited = student.dbtDisbursed >= 125000;

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('dbtTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('dbtSubtitle')}
            </p>
          </div>
          <span className="self-start sm:self-center text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            {t('apbsLinked')}
          </span>
        </div>

        {/* Top 2 Cards in Grid for Desktop / Stack for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Bank & NPCI Status Card */}
          <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {student.bankDetails.bankName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {student.bankDetails.branch}
                    </p>
                  </div>
                </div>

                <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {t('npciActive')}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">{t('accountNumber')}</span>
                  <span className="font-mono font-bold text-slate-800">{student.bankDetails.accountNumber}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">{t('ifscCode')}</span>
                  <span className="font-mono font-bold text-slate-800">{student.bankDetails.ifsc}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-500 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aadhaar seeded directly on NPCI mapper for zero-leakage transfer</span>
            </div>
          </div>

          {/* Disbursal Balance Card */}
          <div className="p-5 rounded-card bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs pb-3 border-b border-white/20">
                <span className="text-emerald-100 font-semibold">{t('disbursalProgress')}</span>
                <span className="font-mono font-bold text-white text-[11px]">AY 2025-26</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-200">
                    {t('disbursedDbt')}
                  </div>
                  <div className="text-2xl font-black text-white mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                    {formatCurrency(student.dbtDisbursed)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-200">
                    {t('pendingDbt')}
                  </div>
                  <div className="text-2xl font-black text-white mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                    {formatCurrency(student.dbtPending)}
                  </div>
                </div>
              </div>
            </div>

            {/* Release Tranche 2 simulation */}
            <div className="mt-5 pt-3 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs text-emerald-100">
                {isTranche2Credited 
                  ? 'All installments fully credited for this cycle ✓' 
                  : isAisheVerified 
                  ? 'AISHE Verified! Ready for Tranche 2 release:' 
                  : 'Tranche 2 queued pending AISHE clearance'}
              </span>

              {!isTranche2Credited && isAisheVerified && (
                <button
                  onClick={disburseTranche2}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-md haptic-press flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('disburseTranche2')}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 6-Stage Government DBT Timeline */}
        <div className="bg-white rounded-card p-5 sm:p-6 border border-slate-200/80 shadow-soft">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-5">
            {t('officialPathway')}
          </div>

          <div className="relative pl-6 space-y-6 max-w-4xl">
            <div className="absolute top-2 bottom-4 left-2.5 w-0.5 bg-slate-200"></div>

            {dbtTimeline.map((item, index) => {
              return (
                <div key={index} className="relative">
                  <div
                    className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      item.isFinal
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-blue-600 text-white ring-4 ring-blue-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        Stage {item.stage}: {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>

                    {item.amount && (
                      <div className="mt-3 pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-bold text-emerald-600">
                          Credited: {item.amount}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          UTR: {item.utr}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => showToast("Downloading official PFMS APBS Disbursal Statement (PDF)...", "success")}
            className="mt-6 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 haptic-press"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{t('downloadPfmsReceipt')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
