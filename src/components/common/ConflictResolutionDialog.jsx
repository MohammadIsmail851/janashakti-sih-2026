import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  X,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  Info,
  GraduationCap,
  CreditCard,
  ArrowRight,
  FileWarning
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

// Simulated conflict data — what MoTA's cross-scheme registry would detect
const CONFLICT_DATA = {
  conflictingScheme: 'State ST Post-Matric Scholarship (Odisha)',
  conflictingDept: 'Tribal Development & SC/ST Dept, Odisha Govt',
  conflictingAmount: '₹18,000 / year',
  conflictingAY: 'AY 2024-25',
  aadhaarMatch: 'XXXX-XXXX-8921',
  conflictSeverity: 'High',
  legalRef: 'Para 7(iii) of PM-JAY ST Scholarship Guidelines, 2023',
  allowedOptions: [
    {
      id: 'central',
      label: 'Apply for Central MoTA Scheme Only',
      scheme: 'Top Class Education Scholarship (MoTA)',
      amount: '₹1,25,000',
      provider: 'Ministry of Tribal Affairs',
      recommended: true,
      reason: 'Higher benefit — tuition fee waiver + full living allowance'
    },
    {
      id: 'state',
      label: 'Retain State Scheme Only',
      scheme: 'Odisha ST Post-Matric Scholarship',
      amount: '₹18,000',
      provider: 'Tribal Development Dept, Odisha',
      recommended: false,
      reason: 'Lower benefit; continues existing state disbursement'
    }
  ]
};

export const ConflictResolutionDialog = ({ isOpen, onClose, onResolved, schemeName }) => {
  const { showToast, addNotification } = useNotifications();
  const [selected, setSelected] = useState('central');
  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const handleResolve = async () => {
    setIsResolving(true);
    await new Promise(res => setTimeout(res, 1200));
    setIsResolving(false);
    setResolved(true);

    const choice = CONFLICT_DATA.allowedOptions.find(o => o.id === selected);
    addNotification({
      title: 'Scholarship Conflict Resolved ✓',
      message: `You have opted for "${choice.scheme}". The conflicting state scheme has been flagged for withdrawal at the state portal.`,
      type: 'success',
      category: 'Verification',
      actionLink: '/scholarships'
    });
    showToast(`Conflict resolved: Proceeding with ${choice.label}`, 'success');

    setTimeout(() => {
      if (onResolved) onResolved(selected);
      onClose();
      setResolved(false);
      setSelected('central');
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', bounce: 0.25 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-5 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-black font-['Plus_Jakarta_Sans',sans-serif]">
                  Scholarship Conflict Detected
                </h2>
                <p className="text-xs text-rose-100">Cross-Scheme Registry — Dual Benefit Alert</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {resolved ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-3"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-black text-slate-900 text-lg">Conflict Resolved!</h3>
                <p className="text-xs text-slate-500">Your preference has been saved and flagged to the MoTA Central PMU.</p>
              </motion.div>
            ) : (
              <>
                {/* Conflict Info */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-rose-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Duplicate Benefit Detected</span>
                    <span className="ml-auto text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                      {CONFLICT_DATA.conflictSeverity} Severity
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Existing Scheme:</span>
                      <span className="font-bold text-slate-800 text-right max-w-[55%]">{CONFLICT_DATA.conflictingScheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dept:</span>
                      <span className="font-semibold text-slate-700 text-right max-w-[55%]">{CONFLICT_DATA.conflictingDept}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Received:</span>
                      <span className="font-bold text-rose-700">{CONFLICT_DATA.conflictingAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Academic Year:</span>
                      <span className="font-bold text-slate-800">{CONFLICT_DATA.conflictingAY}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Matched via:</span>
                      <span className="font-bold text-slate-800">Aadhaar {CONFLICT_DATA.aadhaarMatch}</span>
                    </div>
                  </div>
                </div>

                {/* Legal Reference */}
                <div className="flex items-start space-x-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <FileWarning className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    <strong>Legal Note:</strong> {CONFLICT_DATA.legalRef} — Students cannot draw benefits from two overlapping scholarship schemes simultaneously.
                  </p>
                </div>

                {/* Resolution Options */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Choose Your Preference
                  </h3>
                  <div className="space-y-2.5">
                    {CONFLICT_DATA.allowedOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSelected(opt.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all ${
                          selected === opt.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                            selected === opt.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                          }`}>
                            {selected === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                              {opt.recommended && (
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                  RECOMMENDED
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-600 mt-0.5">{opt.scheme}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <CreditCard className="w-3 h-3 text-emerald-600" />
                              <span className="text-[11px] font-bold text-emerald-700">{opt.amount}</span>
                              <span className="text-[10px] text-slate-400">• {opt.reason}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 haptic-press disabled:opacity-70"
                >
                  {isResolving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Updating PMU Registry...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Resolve Conflict</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  Your choice will be recorded in the MoTA Cross-Scheme Registry and shared with the respective state department.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
