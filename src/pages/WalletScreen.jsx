import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderLock, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Eye, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Plus, 
  Share2, 
  CheckCircle2, 
  FileText,
  Copy
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';

export const WalletScreen = () => {
  const { t } = useLanguage();
  const { 
    documents, 
    setPreviewDocument, 
    setIsScanningModalOpen, 
    deleteDocument, 
    replaceDocument, 
    renewIncomeCertificate,
    reuseDocumentInApplication
  } = useScholarship();
  const { showToast } = useNotifications();

  const [replacingDocId, setReplacingDocId] = useState(null);

  const expiringDoc = documents.find(d => d.expiryAlert);

  const handleSimulateReplace = async (doc) => {
    showToast(`Replacing & re-scanning ${doc.name}...`, "info");
    await replaceDocument(doc.id, {
      name: `${doc.name} (Updated ${new Date().getFullYear()})`,
      type: doc.type
    });
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Title & Add Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('walletTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('walletSubtitle')}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsScanningModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 haptic-press"
            >
              <Plus className="w-4 h-4" />
              <span>{t('scanAdd')}</span>
            </button>
          </div>
        </div>

        {/* Expiry Deficiency Alert */}
        {expiringDoc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 sm:p-5 rounded-card bg-rose-50 border border-rose-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                  {t('deficiencyAlert')}
                </span>
                <p className="text-xs text-rose-800 font-medium mt-1 leading-snug max-w-2xl">
                  {expiringDoc.name} expires on {expiringDoc.expiryDate}. Auto-fetch renewed certificate directly from Odisha e-District.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={renewIncomeCertificate}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm haptic-press flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t('autoRenew')}</span>
              </button>
              <button
                onClick={() => setPreviewDocument(expiringDoc)}
                className="px-3.5 py-2 rounded-xl bg-white text-rose-800 border border-rose-200 text-xs font-bold haptic-press"
              >
                {t('inspect')}
              </button>
            </div>
          </motion.div>
        )}

        {/* DigiLocker Vault Banner */}
        <div className="p-4 rounded-card bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-bold">{t('vaultSecurity')}</div>
              <div className="text-xs text-slate-300 mt-0.5">
                {t('vaultSecurityDesc')}
              </div>
            </div>
          </div>
          <span className="self-start sm:self-center text-xs font-extrabold text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/30">
            {t('encrypted')}
          </span>
        </div>

        {/* Responsive Document Cards Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const hasAlert = Boolean(doc.expiryAlert);

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-card p-4 sm:p-5 border transition-all shadow-soft hover:shadow-soft-lg flex flex-col justify-between ${
                  hasAlert ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200/80'
                }`}
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {doc.type}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        {t('verifiedBadge')}
                      </span>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                        OCR {doc.ocrScore}%
                      </span>
                    </div>
                  </div>

                  {/* Doc Name & Issuer */}
                  <div className="mt-3">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {doc.issuer}
                    </p>
                  </div>

                  {/* Metadata Box */}
                  <div className="mt-3 p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">{t('identifier')}</span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">
                        {doc.docNumber}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">{t('validity')}</span>
                      <span className={`text-[11px] font-bold ${hasAlert ? 'text-rose-600' : 'text-slate-700'}`}>
                        {doc.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Working Document Actions: Preview, Replace, Delete, Reuse */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <button
                      onClick={() => setPreviewDocument(doc)}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1 haptic-press"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('previewDoc')}</span>
                    </button>

                    <button
                      onClick={() => handleSimulateReplace(doc)}
                      className="py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center space-x-1 haptic-press"
                      title="Replace with updated copy"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t('replaceDoc')}</span>
                    </button>

                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 text-xs font-bold transition-colors haptic-press"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reuse in Applications Button */}
                  <button
                    onClick={() => reuseDocumentInApplication(doc.name, 'Top Class & NFST')}
                    className="w-full py-1.5 rounded-xl border border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50 text-blue-700 text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition-colors haptic-press"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{t('reuseInApplication')}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
