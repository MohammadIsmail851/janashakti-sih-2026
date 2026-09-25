import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Sparkles, CheckCircle2, Scan, ShieldCheck } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const UploadScannerModal = () => {
  const { isScanningModalOpen, setIsScanningModalOpen, addDocument, student } = useScholarship();
  const [docType, setDocType] = useState('Income Certificate (Renewal)');
  const [docName, setDocName] = useState('Annual Income Certificate 2026-27');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1); // 1: Choose/Capture, 2: AI Analyzing, 3: Completed
  const [scanResult, setScanResult] = useState(null);

  if (!isScanningModalOpen) return null;

  const docOptions = [
    { type: 'Income Certificate (Renewal)', name: 'Annual Income Certificate 2026-27' },
    { type: 'Hostel Bonafide & Mess Dues', name: 'NIT Rourkela Hostel Resident Certificate' },
    { type: 'Semester VI Grade Card', name: 'NIT Rourkela Sem VI Grade Card' },
    { type: 'Bank Passbook / Cancelled Cheque', name: 'SBI Bank Passbook (NPCI Linked)' },
  ];

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanStep(2);

    const result = await addDocument({
      name: docName,
      type: docType,
      issuer: docType.includes('Income') ? 'Tahasildar, Govt of Odisha' : 'NIT Rourkela Registrar'
    });

    setScanResult(result);
    setIsScanning(false);
    setScanStep(3);
  };

  const handleClose = () => {
    setIsScanningModalOpen(false);
    setScanStep(1);
    setScanResult(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-card p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Scan className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  AI Document Scanner & Quality Meter
                </h3>
                <p className="text-xs text-slate-500">
                  Instant OCR & Anti-Tamper Verification
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 haptic-press"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* STEP 1: Select Type & Capture */}
          {scanStep === 1 && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Document Category
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {docOptions.map((opt) => (
                    <button
                      key={opt.type}
                      onClick={() => {
                        setDocType(opt.type);
                        setDocName(opt.name);
                      }}
                      className={`text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        docType === opt.type
                          ? 'border-blue-600 bg-blue-50/70 font-bold text-blue-900 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{opt.type}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{opt.name}</div>
                      </div>
                      {docType === opt.type && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewfinder Mockup */}
              <div className="relative aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-white border-2 border-dashed border-blue-400/40 p-4">
                <div className="absolute inset-4 border-2 border-white/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-t-2 border-l-2 border-blue-400"></span>
                    <span className="w-4 h-4 border-t-2 border-r-2 border-blue-400"></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-b-2 border-l-2 border-blue-400"></span>
                    <span className="w-4 h-4 border-b-2 border-r-2 border-blue-400"></span>
                  </div>
                </div>

                <Camera className="w-10 h-10 text-blue-400 mb-2 opacity-80" />
                <span className="text-xs font-semibold text-slate-200">
                  Align Document within Frame
                </span>
                <span className="text-[10px] text-slate-400 mt-1 text-center max-w-[220px]">
                  AI automatically detects edges, corrects skew, and validates Govt QR stamp
                </span>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleStartScan}
                  className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 haptic-press"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Scan & Run AI Engine</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Live AI Analyzing */}
          {scanStep === 2 && (
            <div className="py-10 flex flex-col items-center text-center space-y-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
                <Scan className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  AI Extraction in Progress...
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Running Optical Character Recognition, measuring edge bounds & checking DigiLocker state hash...
                </p>
              </div>

              {/* Progress pulses */}
              <div className="w-full space-y-2 max-w-xs text-left text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Detecting State Emblem & Seal...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Cross-referencing Name with Aadhaar...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Calculating Lighting & Glare Index...</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Results & Quality Meter */}
          {scanStep === 3 && scanResult && (
            <div className="py-4 space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Document Verified & Added to Wallet!
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Ready for single-click scholarship re-submission.
                  </div>
                </div>
              </div>

              {/* Quality Breakdown Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-800 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 mr-1" />
                    AI Quality Index Score
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                    {scanResult.ocrScore}% Confidence
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Lighting & Contrast:</span>
                      <span className="font-bold text-slate-800">{scanResult.qualityMeter.lighting}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scanResult.qualityMeter.lighting}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Character Legibility (Clarity):</span>
                      <span className="font-bold text-slate-800">{scanResult.qualityMeter.clarity}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${scanResult.qualityMeter.clarity}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Edge Bounds & Skew Correction:</span>
                      <span className="font-bold text-slate-800">{scanResult.qualityMeter.edges}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${scanResult.qualityMeter.edges}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                    Anti-Tamper Signature
                  </span>
                  <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    Match 100% Authentic
                  </span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 haptic-press"
              >
                Done • View in Digital Wallet
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
