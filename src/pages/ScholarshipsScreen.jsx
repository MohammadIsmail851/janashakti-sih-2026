import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  ScanLine
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { ConflictResolutionDialog } from '../components/common/ConflictResolutionDialog';

export const ScholarshipsScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { schemes, student } = useScholarship();
  const [filter, setFilter] = useState('all'); // 'all' | 'enrolled' | 'eligible'
  const [conflictOpen, setConflictOpen] = useState(false);
  const [conflictScheme, setConflictScheme] = useState(null);

  const filteredSchemes = schemes.filter(scheme => {
    if (filter === 'enrolled') return scheme.id === student.activeSchemeId;
    if (filter === 'eligible') return scheme.id !== 'pre-matric';
    return true;
  });

  const handleSchemeClick = (scheme) => {
    // Simulate conflict detection for "Post-Matric" scheme (student already has state scholarship)
    if (scheme.id === 'post-matric' && !scheme._conflictResolved) {
      setConflictScheme(scheme.name);
      setConflictOpen(true);
    } else {
      navigate(`/scholarships/${scheme.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Title & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('allSchemes')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Unified Portfolios • Ministry of Tribal Affairs
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="self-start sm:self-center text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              NSP 2.0 Unified
            </span>
            <button
              onClick={() => navigate('/deficiency-detector')}
              className="flex items-center space-x-1.5 text-xs font-bold text-violet-700 bg-violet-100 hover:bg-violet-200 px-3 py-1 rounded-full transition-colors haptic-press"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>Check Docs</span>
            </button>
          </div>
        </div>

        {/* Conflict Alert Banner */}
        <div
          onClick={() => { setConflictScheme('Post-Matric Scholarship'); setConflictOpen(true); }}
          className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 cursor-pointer hover:bg-rose-100 transition-colors haptic-press"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-4.5 h-4.5 text-rose-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-rose-800">Conflict Detected — Dual Benefit Risk</span>
              <span className="text-[9px] font-bold bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded-full">ACTION REQUIRED</span>
            </div>
            <p className="text-[11px] text-rose-700 mt-0.5">
              A conflicting state scholarship (Odisha ST Post-Matric) detected for your Aadhaar. Resolve before applying for any central MoTA scheme.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm max-w-md">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('allSchemes')}
          </button>
          <button
            onClick={() => setFilter('enrolled')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'enrolled'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('enrolledSchemes')}
          </button>
          <button
            onClick={() => setFilter('eligible')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'eligible'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('eligiblePathways')}
          </button>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSchemes.map((scheme) => {
            const isEnrolled = scheme.id === student.activeSchemeId;
            const hasConflict = scheme.id === 'post-matric';

            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSchemeClick(scheme)}
                className={`bg-white rounded-card p-5 sm:p-6 border transition-all cursor-pointer shadow-soft hover:shadow-soft-lg flex flex-col justify-between haptic-press ${
                  isEnrolled ? 'border-blue-400 ring-2 ring-blue-500/10' : 
                  hasConflict ? 'border-rose-300 ring-1 ring-rose-200' :
                  'border-slate-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {scheme.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {scheme.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {hasConflict && (
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isEnrolled
                            ? 'bg-blue-100 text-blue-700'
                            : hasConflict
                            ? 'bg-rose-100 text-rose-700'
                            : scheme.id === 'pre-matric'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {hasConflict ? 'Conflict ⚠' : scheme.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {scheme.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      {scheme.subtitle}
                    </p>
                  </div>

                  {/* Financial Sanction & Progress */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">{t('sanctionBenefit')}:</span>
                      <span className="font-extrabold text-blue-700 text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                        {scheme.sanctionFormatted}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between items-center text-[10px] mb-1 text-slate-500">
                        <span>{t('pipelineProgress')}</span>
                        <span className="font-bold text-slate-700">{scheme.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            scheme.progress === 100
                              ? 'bg-emerald-500'
                              : hasConflict
                              ? 'bg-rose-400'
                              : 'bg-gradient-to-r from-blue-600 to-sky-500'
                          }`}
                          style={{ width: `${scheme.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{t('stage')}:</span>
                      <span className="font-semibold text-slate-800 flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 mr-1" />
                        {scheme.verificationStage}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-600 font-medium truncate max-w-[280px]">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate text-xs">{scheme.nextAction}</span>
                  </div>
                  <span className={`font-bold flex items-center text-xs shrink-0 ${hasConflict ? 'text-rose-600' : 'text-blue-600'}`}>
                    {hasConflict ? 'Resolve Conflict' : t('viewDetails')}
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Conflict Resolution Dialog */}
      <ConflictResolutionDialog
        isOpen={conflictOpen}
        onClose={() => setConflictOpen(false)}
        schemeName={conflictScheme}
        onResolved={(choice) => {
          setConflictOpen(false);
          if (choice === 'central') {
            navigate('/scholarships/post-matric');
          }
        }}
      />
    </div>
  );
};
