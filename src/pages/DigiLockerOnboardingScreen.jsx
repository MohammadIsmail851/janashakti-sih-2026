import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FolderOpen,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Lock,
  Fingerprint,
  FileText,
  IdCard,
  BookOpen,
  Home,
  CreditCard,
  Sparkles,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useScholarship } from '../context/ScholarshipContext';
import { useNotifications } from '../context/NotificationContext';

const DIGILOCKER_DOCS = [
  {
    id: 'aadhaar',
    name: 'Aadhaar Card',
    issuer: 'UIDAI (Govt of India)',
    docNumber: '8921 4410 8921',
    icon: IdCard,
    color: 'blue',
    delay: 400,
    description: 'Unique identification — verified via UIDAI',
    category: 'Identity'
  },
  {
    id: 'apaar',
    name: 'APAAR (Academic Bank of Credits)',
    issuer: 'Ministry of Education — UGC Portal',
    docNumber: 'APAAR-OD-2021-HEM-0892',
    icon: BookOpen,
    color: 'violet',
    delay: 1200,
    description: 'Academic identity & credit records',
    category: 'Academic'
  },
  {
    id: 'st-certificate',
    name: 'Scheduled Tribe Certificate',
    issuer: 'Sub-Divisional Magistrate, Mayurbhanj (Odisha)',
    docNumber: 'OD/MBJ/ST/2021/00918',
    icon: ShieldCheck,
    color: 'amber',
    delay: 2100,
    description: 'Community verification — Santhal tribe',
    category: 'Community'
  },
  {
    id: 'income-cert',
    name: 'Income Certificate',
    issuer: 'Revenue Dept — Mayurbhanj, Odisha',
    docNumber: 'INC/2026/MBJ/90118',
    icon: CreditCard,
    color: 'emerald',
    delay: 3000,
    description: 'Annual family income: ₹1,80,000',
    category: 'Economic'
  },
  {
    id: 'domicile',
    name: 'Domicile Certificate',
    issuer: 'Revenue & Disaster Mgmt Dept, Odisha',
    docNumber: 'DOM/OD/2022/MBJ/4812',
    icon: Home,
    color: 'rose',
    delay: 3800,
    description: 'Permanent resident of Odisha',
    category: 'Residence'
  }
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'bg-blue-100', badge: 'bg-blue-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', icon: 'bg-violet-100', badge: 'bg-violet-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: 'bg-amber-100', badge: 'bg-amber-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: 'bg-emerald-100', badge: 'bg-emerald-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: 'bg-rose-100', badge: 'bg-rose-600' }
};

export const DigiLockerOnboardingScreen = () => {
  const navigate = useNavigate();
  const { addDocument } = useScholarship();
  const { showToast, addNotification } = useNotifications();

  const [phase, setPhase] = useState('consent'); // 'consent' | 'fetching' | 'done'
  const [fetchedDocs, setFetchedDocs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const startFetching = async () => {
    setPhase('fetching');
    showToast('Connecting to DigiLocker Gateway...', 'info');

    // Simulate sequential doc fetch
    for (let i = 0; i < DIGILOCKER_DOCS.length; i++) {
      const doc = DIGILOCKER_DOCS[i];
      await new Promise(res => setTimeout(res, doc.delay - (i > 0 ? DIGILOCKER_DOCS[i - 1].delay : 0)));
      setFetchedDocs(prev => [...prev, doc.id]);
    }

    // Add docs to wallet
    for (const doc of DIGILOCKER_DOCS) {
      await addDocument({
        name: doc.name,
        type: doc.category,
        issuer: doc.issuer,
        docNumber: doc.docNumber
      });
    }

    setIsComplete(true);
    setPhase('done');
    addNotification({
      title: 'DigiLocker Sync Complete ✓',
      message: '5 verified documents imported to your JanaShakti Digital Wallet.',
      type: 'success',
      category: 'Wallet',
      actionLink: '/wallet'
    });
    showToast('5 documents imported from DigiLocker!', 'success');
  };

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col overflow-hidden relative">
      {/* Ambient BG */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-10 pb-6 max-w-lg mx-auto w-full">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              DigiLocker Connect
            </h1>
            <p className="text-[11px] text-slate-400">Secure document import • UIDAI verified</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-8 max-w-lg mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'consent' && (
            <motion.div
              key="consent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Consent Card */}
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-sm">One-Time Document Consent</h2>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      JanaShakti requests read-only access to your DigiLocker to import scholarship-relevant documents. No document is stored externally.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4 space-y-2.5">
                  {DIGILOCKER_DOCS.map((doc) => {
                    const Icon = doc.icon;
                    const colors = colorMap[doc.color];
                    return (
                      <div key={doc.id} className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/40">
                        <div className={`w-8 h-8 rounded-lg ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-200 truncate">{doc.name}</div>
                          <div className="text-[10px] text-slate-500">{doc.issuer}</div>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border} flex-shrink-0`}>
                          {doc.category}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-start space-x-2 p-3 bg-emerald-950/40 border border-emerald-800/30 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-300 leading-relaxed">
                    Protected by NIC Security Shield. DigiLocker OAuth 2.0 — read-only scope. No document will be stored on third-party servers.
                  </p>
                </div>
              </div>

              {/* Aadhaar Auth */}
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <Fingerprint className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-slate-300">Authenticate via Aadhaar OTP</span>
                </div>
                <input
                  type="text"
                  defaultValue="8921 4410 8921"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Aadhaar Number"
                />
                <input
                  type="text"
                  defaultValue="826104"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-mono text-sm tracking-widest text-center focus:outline-none focus:border-blue-500"
                  placeholder="OTP"
                />
              </div>

              <button
                onClick={startFetching}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-blue-600/30 transition-all haptic-press"
              >
                <FolderOpen className="w-5 h-5" />
                <span>Authorise & Import Documents</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-slate-500">
                By proceeding, you agree to Ministry of Tribal Affairs data sharing policy (2024)
              </p>
            </motion.div>
          )}

          {phase === 'fetching' && (
            <motion.div
              key="fetching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-900/30 border border-blue-700/40 rounded-full text-blue-300 text-xs font-bold mb-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Fetching from DigiLocker Gateway...</span>
                </div>
                <p className="text-xs text-slate-500">Secure UIDAI OAuth session active</p>
              </div>

              <div className="space-y-3">
                {DIGILOCKER_DOCS.map((doc, i) => {
                  const Icon = doc.icon;
                  const isFetched = fetchedDocs.includes(doc.id);
                  const colors = colorMap[doc.color];
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: isFetched ? 1 : 0.4 }}
                      className={`bg-slate-800/80 border rounded-2xl p-4 flex items-center space-x-4 transition-all ${
                        isFetched ? `border-emerald-700/50` : 'border-slate-700/40'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${isFetched ? 'bg-emerald-900/40' : colors.icon + '/20'} flex items-center justify-center flex-shrink-0`}>
                        {isFetched
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          : <Icon className={`w-5 h-5 ${colors.text}/60`} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold ${isFetched ? 'text-white' : 'text-slate-500'}`}>{doc.name}</div>
                        <div className={`text-[11px] ${isFetched ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {isFetched ? `✓ Imported • ${doc.docNumber}` : 'Waiting...'}
                        </div>
                      </div>
                      {!isFetched && (
                        <Loader2 className="w-4 h-4 text-slate-600 animate-spin flex-shrink-0" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Import Progress</span>
                  <span>{fetchedDocs.length}/{DIGILOCKER_DOCS.length} Documents</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(fetchedDocs.length / DIGILOCKER_DOCS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              {/* Success Hero */}
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-600/40"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  Wallet Synced!
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  All 5 documents imported and verified by AI OCR
                </p>
              </div>

              <div className="bg-slate-800/80 border border-emerald-700/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">AI OCR Verification Complete</span>
                </div>
                {DIGILOCKER_DOCS.map(doc => {
                  const Icon = doc.icon;
                  const colors = colorMap[doc.color];
                  return (
                    <div key={doc.id} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-xs text-slate-300 font-medium">{doc.name}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        Verified
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-2xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-300 leading-relaxed">
                  These documents are now linked to your scholarship applications. You won't need to re-upload them for any MoTA scheme.
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-emerald-600/30 transition-all haptic-press"
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
