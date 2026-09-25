import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Upload,
  FileText,
  Eye,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Camera,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Gauge
} from 'lucide-react';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';

// Required documents for scholarship
const REQUIRED_DOCS = [
  { id: 'aadhaar', name: 'Aadhaar Card', schemes: ['All'], mandatory: true },
  { id: 'st-cert', name: 'Scheduled Tribe Certificate', schemes: ['All'], mandatory: true },
  { id: 'income-cert', name: 'Income Certificate', schemes: ['All'], mandatory: true },
  { id: 'domicile', name: 'Domicile Certificate', schemes: ['All'], mandatory: true },
  { id: 'apaar', name: 'APAAR / Student ID', schemes: ['Top Class', 'NFST', 'NOS'], mandatory: true },
  { id: 'fee-receipt', name: 'Fee Receipt (Current Semester)', schemes: ['Top Class', 'Post-Matric'], mandatory: true },
  { id: 'bonafide', name: 'Institute Bonafide Certificate', schemes: ['Top Class', 'NFST'], mandatory: true },
  { id: 'marks', name: 'Previous Year Marksheet', schemes: ['Top Class', 'Post-Matric'], mandatory: false },
  { id: 'bank', name: 'Bank Passbook (Aadhaar-linked)', schemes: ['All'], mandatory: true }
];

const simulateOCR = async (docId, existingDocs) => {
  await new Promise(res => setTimeout(res, 600 + Math.random() * 800));

  const docInfo = existingDocs.find(d => d.name?.toLowerCase().includes(docId.toLowerCase()) || d.type?.toLowerCase().includes(docId.toLowerCase()));

  if (docInfo) {
    const ocrScore = docInfo.ocrScore || (80 + Math.random() * 19);
    const isBlurred = ocrScore < 65;
    const isTampered = false;
    return {
      found: true,
      ocrScore: Math.round(ocrScore * 10) / 10,
      isBlurred,
      isTampered,
      isExpired: docInfo.isExpired || false,
      expiryAlert: docInfo.expiryAlert || null,
      docNumber: docInfo.docNumber,
      issuer: docInfo.issuer,
      status: isBlurred ? 'blurred' : isTampered ? 'tampered' : ocrScore >= 75 ? 'verified' : 'low_quality'
    };
  }

  return { found: false, status: 'missing' };
};

const statusConfig = {
  verified: { label: 'Verified', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', barColor: 'bg-emerald-500' },
  blurred: { label: 'Blurred / Unclear', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', barColor: 'bg-amber-400' },
  tampered: { label: 'Possible Tamper', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', barColor: 'bg-rose-500' },
  low_quality: { label: 'Low Quality', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', barColor: 'bg-orange-400' },
  missing: { label: 'Not Uploaded', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', barColor: 'bg-rose-300' },
  pending: { label: 'Pending Scan', icon: Loader2, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', barColor: 'bg-slate-300' }
};

export const DeficiencyDetectorScreen = () => {
  const { documents } = useScholarship();
  const { showToast } = useNotifications();

  const [results, setResults] = useState({});
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [expandedDoc, setExpandedDoc] = useState(null);

  const runFullScan = async () => {
    setScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    setResults({});
    showToast('AI OCR Engine initializing...', 'info');

    for (let i = 0; i < REQUIRED_DOCS.length; i++) {
      const doc = REQUIRED_DOCS[i];
      setResults(prev => ({ ...prev, [doc.id]: { status: 'pending' } }));
      const result = await simulateOCR(doc.id, documents);
      setResults(prev => ({ ...prev, [doc.id]: result }));
      setScanProgress(Math.round(((i + 1) / REQUIRED_DOCS.length) * 100));
    }

    setScanning(false);
    setScanComplete(true);
    showToast('Document scan complete! Review your results.', 'success');
  };

  const getCompleteness = () => {
    const total = REQUIRED_DOCS.filter(d => d.mandatory).length;
    const verified = REQUIRED_DOCS.filter(d => d.mandatory && results[d.id]?.status === 'verified').length;
    return total > 0 ? Math.round((verified / total) * 100) : 0;
  };

  const completeness = getCompleteness();
  const issues = REQUIRED_DOCS.filter(d => results[d.id] && results[d.id].status !== 'verified' && results[d.id].status !== 'pending');
  const verified = REQUIRED_DOCS.filter(d => results[d.id]?.status === 'verified');

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 rounded-card text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black font-['Plus_Jakarta_Sans',sans-serif]">
                Smart Deficiency Detector
              </h1>
              <p className="text-xs text-slate-400">AI OCR Engine — Document Quality & Completeness Audit</p>
            </div>
          </div>
        </div>

        {/* Scan CTA */}
        {!scanning && !scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-card border border-slate-200 shadow-soft p-5 space-y-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">AI Document Audit</h2>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Scan all {REQUIRED_DOCS.length} required scholarship documents for OCR confidence, blur detection, expiry alerts, and completeness. Matches against your Digital Wallet.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Camera, label: 'Blur Detection', desc: 'Pixel clarity check' },
                { icon: ShieldCheck, label: 'Anti-Tamper', desc: 'Metadata integrity' },
                { icon: Eye, label: 'OCR Confidence', desc: 'Text extraction score' }
              ].map(f => (
                <div key={f.label} className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <f.icon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-slate-800">{f.label}</div>
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </div>
              ))}
            </div>

            <button
              onClick={runFullScan}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 haptic-press transition-all"
            >
              <ScanLine className="w-5 h-5" />
              <span>Run Full Document Scan</span>
            </button>
          </motion.div>
        )}

        {/* Scanning Progress */}
        {scanning && (
          <div className="bg-white rounded-card border border-blue-200 shadow-soft p-5 space-y-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Scanning documents with AI OCR...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completeness Score */}
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white rounded-card border shadow-soft p-5 ${
              completeness >= 80 ? 'border-emerald-200' : completeness >= 50 ? 'border-amber-200' : 'border-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Application Completeness</h2>
                <p className="text-xs text-slate-500">Mandatory document audit score</p>
              </div>
              <button
                onClick={runFullScan}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Circle gauge */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={completeness >= 80 ? '#10b981' : completeness >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3"
                    strokeDasharray={`${completeness} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-xl font-black ${completeness >= 80 ? 'text-emerald-600' : completeness >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {completeness}%
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-slate-600 font-medium">{verified.length} documents verified</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-slate-600 font-medium">{issues.length} issues found</span>
                </div>
                <div className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                  completeness >= 80 ? 'bg-emerald-100 text-emerald-800' :
                  completeness >= 50 ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {completeness >= 80 ? '✓ Ready to Submit' : completeness >= 50 ? '⚠ Needs Attention' : '✗ Incomplete'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Issues Summary */}
        {scanComplete && issues.length > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-card p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                {issues.length} Action Items Required
              </span>
            </div>
            {issues.map(doc => {
              const result = results[doc.id];
              const cfg = statusConfig[result?.status] || statusConfig.missing;
              const Icon = cfg.icon;
              return (
                <div key={doc.id} className="flex items-center space-x-2.5 text-xs text-rose-700">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-semibold">{doc.name}:</span>
                  <span>{cfg.label}{result?.expiryAlert ? ` — ${result.expiryAlert}` : ''}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Document List */}
        {(scanning || scanComplete) && (
          <div className="bg-white rounded-card border border-slate-200 shadow-soft overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Document-by-Document Results</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {REQUIRED_DOCS.map((doc) => {
                const result = results[doc.id];
                const status = result?.status || 'pending';
                const cfg = statusConfig[status];
                const Icon = cfg.icon;
                const isExpanded = expandedDoc === doc.id;

                return (
                  <div key={doc.id}>
                    <button
                      onClick={() => result && result.status !== 'pending' && setExpandedDoc(isExpanded ? null : doc.id)}
                      className="w-full text-left p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                          {status === 'pending' && scanning ? (
                            <Loader2 className={`w-4 h-4 ${cfg.color} animate-spin`} />
                          ) : (
                            <Icon className={`w-4 h-4 ${cfg.color}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">{doc.name}</span>
                            {!doc.mandatory && (
                              <span className="ml-2 text-[9px] text-slate-400 font-medium flex-shrink-0">Optional</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            {result?.ocrScore && (
                              <div className="flex-1 max-w-[100px]">
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${cfg.barColor} rounded-full`}
                                    style={{ width: `${result.ocrScore}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            <span className={`text-[10px] font-bold ${cfg.color}`}>{cfg.label}</span>
                            {result?.ocrScore && (
                              <span className="text-[10px] text-slate-400">OCR: {result.ocrScore}%</span>
                            )}
                          </div>
                        </div>
                        {result && result.status !== 'pending' && (
                          <div className="text-slate-300">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isExpanded && result && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={`mx-4 mb-3 p-3 rounded-2xl ${cfg.bg} border ${cfg.border} text-xs space-y-1.5`}>
                            {result.docNumber && (
                              <div className="flex justify-between">
                                <span className="text-slate-500">Doc Number:</span>
                                <span className="font-bold text-slate-800">{result.docNumber}</span>
                              </div>
                            )}
                            {result.issuer && (
                              <div className="flex justify-between">
                                <span className="text-slate-500">Issuer:</span>
                                <span className="font-semibold text-slate-700 text-right max-w-[60%]">{result.issuer}</span>
                              </div>
                            )}
                            {result.ocrScore && (
                              <div className="flex justify-between">
                                <span className="text-slate-500">OCR Confidence:</span>
                                <span className={`font-bold ${cfg.color}`}>{result.ocrScore}%</span>
                              </div>
                            )}
                            {result.isBlurred && (
                              <div className="flex items-center space-x-1.5 text-amber-700 font-semibold">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Image appears blurred — re-scan recommended</span>
                              </div>
                            )}
                            {result.expiryAlert && (
                              <div className="flex items-center space-x-1.5 text-rose-700 font-semibold">
                                <Info className="w-3 h-3" />
                                <span>{result.expiryAlert}</span>
                              </div>
                            )}
                            {result.status === 'missing' && (
                              <div className="flex items-center space-x-1.5 text-rose-700 font-semibold">
                                <Upload className="w-3 h-3" />
                                <span>Upload this document to your Wallet to proceed</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
