import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Download, ExternalLink, Sparkles, QrCode } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';
import { useNotifications } from '../../context/NotificationContext';

export const DocumentPreviewModal = () => {
  const { previewDocument, setPreviewDocument } = useScholarship();
  const { showToast } = useNotifications();

  if (!previewDocument) return null;

  const doc = previewDocument;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-card p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                  {doc.type}
                </span>
                <span className="flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1.5 leading-snug">
                {doc.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {doc.issuer}
              </p>
            </div>
            <button
              onClick={() => setPreviewDocument(null)}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 haptic-press"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Mockup Canvas */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/30 border border-slate-200/80 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-5xl font-black text-slate-900 rotate-[-25deg]">
                GOVERNMENT OF INDIA
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-dashed border-slate-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                  GOI
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                    Ministry of Tribal Affairs
                  </div>
                  <div className="text-[10px] text-slate-500">
                    National DigiLocker Repository
                  </div>
                </div>
              </div>
              <QrCode className="w-9 h-9 text-slate-800" />
            </div>

            {/* Document Core Info */}
            <div className="py-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Document No:</span>
                <span className="font-mono font-bold text-slate-800">{doc.docNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issue Date:</span>
                <span className="font-semibold text-slate-700">{doc.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Validity:</span>
                <span className={`font-semibold ${doc.daysLeft && doc.daysLeft < 30 ? 'text-amber-600 font-bold' : 'text-emerald-700'}`}>
                  {doc.expiryDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="font-medium text-blue-600">{doc.verificationSource}</span>
              </div>
            </div>

            {/* Extracted Fields */}
            {doc.matchedFields && (
              <div className="mt-3 p-3 bg-white/90 rounded-xl border border-slate-200/60">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center">
                  <Sparkles className="w-3 h-3 text-blue-600 mr-1" />
                  AI Verified Attributes
                </div>
                <div className="space-y-1">
                  {Object.entries(doc.matchedFields).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-[11px]">
                      <span className="capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Quality Meter Summary */}
          {doc.qualityScore && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                  AI Document Health Index
                </span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  OCR: {doc.ocrScore}% Match
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 bg-white rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-medium">Lighting</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{doc.qualityScore.lighting}%</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-medium">Clarity</div>
                  <div className="font-bold text-slate-800 text-xs mt-0.5">{doc.qualityScore.clarity}%</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-medium">Tamper Check</div>
                  <div className="font-bold text-emerald-600 text-xs mt-0.5">Passed</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => {
                showToast("Downloading digitally signed copy with MoTA seal...", "success");
              }}
              className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 haptic-press"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => {
                showToast("Verifying hash with National DigiLocker ledger...", "info");
              }}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 haptic-press"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
