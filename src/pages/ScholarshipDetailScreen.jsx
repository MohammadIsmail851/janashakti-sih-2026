import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Calendar, 
  Building2, 
  FileText,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';
import { evaluateScholarshipEligibility } from '../utils/ocrSimulator';

export const ScholarshipDetailScreen = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { schemes, student, documents } = useScholarship();
  const { showToast } = useNotifications();

  const scheme = schemes.find(s => s.id === schemeId) || schemes[0];
  const eligibilityAnalysis = evaluateScholarshipEligibility(student, scheme);
  const isEnrolled = scheme.id === student.activeSchemeId;

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/scholarships')}
            className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-soft-sm haptic-press"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>{t('allSchemes')}</span>
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            {scheme.code}
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-card p-5 sm:p-6 border border-slate-200/80 shadow-soft relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 text-xs gap-2">
            <span className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-800 self-start sm:self-auto">
              {scheme.ministry}
            </span>
            <span className="font-bold text-slate-700">
              Deadline: {scheme.deadline}
            </span>
          </div>

          <div className="mt-4">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
              {scheme.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed max-w-4xl">
              {scheme.subtitle}
            </p>
          </div>

          {/* Sanction Details */}
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">
                {t('sanctionBenefit')}
              </div>
              <div className="text-2xl font-black text-blue-700 font-['Plus_Jakarta_Sans',sans-serif]">
                {scheme.sanctionFormatted}
              </div>
            </div>
            {isEnrolled && (
              <button
                onClick={() => navigate('/dbt')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-500/20 haptic-press self-start sm:self-auto"
              >
                <CreditCard className="w-4 h-4" />
                <span>Track DBT Payment</span>
              </button>
            )}
          </div>
        </div>

        {/* Responsive Dual Column for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* AI Eligibility Prediction Card */}
          <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('eligibilityPredictor')}
                  </h3>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {eligibilityAnalysis.score}% {t('matchScore')}
                </span>
              </div>

              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed font-medium">
                <div className="font-bold flex items-center mb-1 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Candidate Criteria Satisfied
                </div>
                {eligibilityAnalysis.reason}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Category Match</span>
                  <span className="font-bold text-slate-800">{student.category} ({student.subTribe}) ✓</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Family Income</span>
                  <span className="font-bold text-slate-800">{student.family.incomeFormatted} (Eligible) ✓</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-400">
              Evaluated under Government of India Statutory Rules for Scheduled Tribe Higher Education.
            </div>
          </div>

          {/* Scheme Benefits Breakdown */}
          <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              {t('benefitsCoverage')}
            </h3>
            <div className="space-y-2.5">
              {scheme.benefits.map((b, i) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Linked Documents from Wallet */}
        <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t('requiredDocs')}
            </h3>
            <span className="text-xs font-bold text-emerald-600">
              100% Synced from Wallet
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate('/wallet')}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center shrink-0">
                  <ShieldCheck className="w-3 h-3 mr-0.5" />
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => showToast("Downloading official MoTA Scheme Guidelines (PDF)...", "success")}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 shadow-soft-sm haptic-press"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{t('downloadGuidelines')}</span>
          </button>

          <button
            onClick={() => navigate('/chatbot')}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 haptic-press"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('askJagoAbout')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
