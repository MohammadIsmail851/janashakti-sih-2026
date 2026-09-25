import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Info, 
  X,
  FileText,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';

export const VerificationCenterScreen = () => {
  const { t } = useLanguage();
  const { 
    verifications, 
    simulateAisheVerification, 
    manualReviewModal, 
    setManualReviewModal 
  } = useScholarship();

  const [activeReviewStage, setActiveReviewStage] = useState(null);

  const openManualReviewModal = (stage) => {
    setActiveReviewStage(stage);
  };

  const closeManualReviewModal = () => {
    setActiveReviewStage(null);
  };

  const getStatusBadge = (status, stage) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified ✓
          </span>
        );
      case 'Pending':
        return (
          <span className="flex items-center text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending Action
          </span>
        );
      case 'Manual Review':
        return (
          <button
            onClick={() => openManualReviewModal(stage)}
            className="flex items-center text-[10px] font-bold text-rose-800 bg-rose-100 hover:bg-rose-200 px-2.5 py-0.5 rounded-full border border-rose-300 transition-colors haptic-press"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Manual Review • View Reason
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('verifyTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('verifySubtitle')}
            </p>
          </div>
          <span className="self-start sm:self-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t('nodesVerified')}
          </span>
        </div>

        {/* Pipeline Stepper Visual Flow */}
        <div className="bg-white rounded-card p-5 sm:p-6 border border-slate-200/80 shadow-soft">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-wider">
            {t('pathwayFlow')}
          </div>

          <div className="flex items-center justify-between relative px-2 sm:px-6">
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -translate-y-1/2 -z-0"></div>
            
            {verifications.map((item) => {
              const isDone = item.status === 'Verified';
              const isPending = item.status === 'Pending';
              const isReview = item.status === 'Manual Review';

              return (
                <div key={item.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isReview
                        ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                        : isPending
                        ? 'bg-amber-500 text-white animate-bounce'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2 uppercase text-center max-w-[70px] truncate">
                    {item.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline Stages Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifications.map((v) => {
            const isVerified = v.status === 'Verified';
            const isPending = v.status === 'Pending';
            const isReview = v.status === 'Manual Review';

            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-card p-5 border transition-all shadow-soft flex flex-col justify-between ${
                  isReview
                    ? 'border-rose-300 ring-2 ring-rose-500/10'
                    : isPending
                    ? 'border-amber-300 ring-2 ring-amber-500/10'
                    : 'border-slate-200/80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : isReview
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {v.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {v.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {v.agency}
                        </p>
                      </div>
                    </div>

                    {getStatusBadge(v.status, v)}
                  </div>

                  <div className="mt-3">
                    <div className="text-xs font-semibold text-slate-700">
                      {v.subtitle}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {v.details}
                    </p>
                  </div>

                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-[11px] text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Timestamp</span>
                      <span className="font-semibold text-slate-800">{v.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Confidence</span>
                      <span className="font-bold text-blue-600">{v.confidence}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Sign-off Button for pending AISHE */}
                {v.canSimulateVerify && (
                  <div className="mt-4 pt-3 border-t border-dashed border-amber-200 flex items-center justify-between">
                    <span className="text-[11px] text-amber-800 font-medium">{t('nodalQueue')}</span>
                    <button
                      onClick={simulateAisheVerification}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 haptic-press flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('simulateNodal')}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Zero-Mismatch Explanation Box */}
        <div className="p-4 sm:p-5 rounded-card bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 leading-relaxed shadow-soft">
          <div className="flex items-center space-x-2 font-bold mb-1 text-blue-800 text-sm">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{t('zeroMismatch')}</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-4xl">
            {t('zeroMismatchDesc')}
          </p>
        </div>

        {/* Working Manual Review Reason Dialog */}
        <AnimatePresence>
          {activeReviewStage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-card max-w-md w-full p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>{t('manualReviewTitle')}</span>
                  </div>
                  <button
                    onClick={closeManualReviewModal}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    {t('manualReviewDesc')}
                  </p>

                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 text-rose-900">
                    <div className="flex justify-between font-semibold">
                      <span>Node Affected:</span>
                      <span>{activeReviewStage.name}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Resolution Channel:</span>
                      <span>Institute Nodal Officer Sign-off</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeManualReviewModal}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md haptic-press"
                >
                  {t('closeDialog')}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
