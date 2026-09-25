import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Smartphone, KeyRound, ArrowRight, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useScholarship } from '../context/ScholarshipContext';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { loginAsStudent, loginAsAdmin } = useAuth();
  const { showToast } = useNotifications();
  const { student } = useScholarship();
  
  const [roleTab, setRoleTab] = useState('student'); // 'student' | 'admin'
  const [authMethod, setAuthMethod] = useState('aadhaar'); // 'aadhaar' | 'digilocker' | 'mobile'
  const [aadhaarInput, setAadhaarInput] = useState('8921 4410 8921');
  const [otpInput, setOtpInput] = useState('141024');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStudentSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    showToast("Authenticating via UIDAI e-KYC & DigiLocker Gateway...", "info");
    await new Promise((res) => setTimeout(res, 800));
    loginAsStudent();
    setIsSubmitting(false);
    showToast(t('loginSuccess'), "success");
    navigate('/home');
  };

  const handleAdminSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    showToast("Authenticating MoTA Officer Credentials & 2FA Key...", "info");
    await new Promise((res) => setTimeout(res, 800));
    loginAsAdmin();
    setIsSubmitting(false);
    showToast("Welcome to MoTA Administrator & Verification Desk", "success");
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="pt-3 max-w-md mx-auto w-full flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            JS
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">{t('portalName')}</div>
            <div className="text-[10px] text-slate-400">{t('ministryName')}</div>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>256-bit SSL</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="my-auto z-10 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
            {roleTab === 'student' ? t('studentLogin') : t('adminLogin')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {roleTab === 'student' 
              ? 'Access 5 Tribal Scholarship Schemes with Unified e-KYC' 
              : 'Ministry Nodal Clearance & DBT Verification Dashboard'}
          </p>
        </div>

        {/* Student vs Admin Role Tab */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/60 mb-4">
          <button
            type="button"
            onClick={() => setRoleTab('student')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
              roleTab === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('studentLogin')}</span>
          </button>

          <button
            type="button"
            onClick={() => setRoleTab('admin')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
              roleTab === 'admin'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t('adminLogin')}</span>
          </button>
        </div>

        {/* Login Form Box */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-card p-5 sm:p-6 shadow-2xl">
          {roleTab === 'student' ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  {t('enterAadhaar')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={aadhaarInput}
                    onChange={(e) => setAadhaarInput(e.target.value)}
                    placeholder="•••• •••• 8921"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-3 text-[11px] text-emerald-400 font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Linked
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {t('enterOtp')}
                  </label>
                  <span className="text-[10px] text-blue-400 font-semibold cursor-pointer">
                    Resend in 24s
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="141024"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-mono text-sm tracking-widest text-center focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all haptic-press"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In as Student'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* DigiLocker separator */}
              <div className="relative flex items-center">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="px-3 text-[10px] text-slate-500 font-medium">or continue with</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <button
                type="button"
                onClick={async () => {
                  setIsSubmitting(true);
                  showToast('Connecting to DigiLocker OAuth Gateway...', 'info');
                  await new Promise(res => setTimeout(res, 900));
                  loginAsStudent();
                  setIsSubmitting(false);
                  showToast('DigiLocker linked successfully!', 'success');
                  navigate('/digilocker-onboarding');
                }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 border border-emerald-800/60 transition-all haptic-press"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Login via DigiLocker</span>
                <span className="text-[9px] bg-emerald-800/60 px-1.5 py-0.5 rounded-full">OAuth 2.0</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  MoTA Government Email / Nodal ID
                </label>
                <input
                  type="email"
                  defaultValue="rameshwar.oraon@mota.gov.in"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Officer Security Token (2FA)
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-600/30 transition-all haptic-press"
              >
                <span>{isSubmitting ? 'Verifying...' : 'Sign In as Administrator'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Evaluation Buttons */}
          <div className="mt-5 pt-3 border-t border-slate-700/60 space-y-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold text-center">
              Evaluator Quick Access
            </div>
            
            <button
              type="button"
              onClick={handleStudentSubmit}
              className="w-full p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-xs flex items-center justify-between transition-colors border border-slate-600/40 haptic-press"
            >
              <div className="text-left">
                <div className="font-bold text-white text-[11px]">{student.name} (Student)</div>
                <div className="text-[10px] text-blue-300">NIT Rourkela • Top Class ST</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                1-Click Login →
              </span>
            </button>

            <button
              type="button"
              onClick={handleAdminSubmit}
              className="w-full p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-xs flex items-center justify-between transition-colors border border-slate-600/40 haptic-press"
            >
              <div className="text-left">
                <div className="font-bold text-white text-[11px]">Dr. Rameshwar Oraon (Admin)</div>
                <div className="text-[10px] text-amber-300">MoTA Director • Verification Desk</div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                1-Click Admin →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="pt-4 text-center text-[10px] text-slate-500 space-y-1 z-10">
        <div>Official Portal • Ministry of Tribal Affairs • Government of India</div>
        <div>Protected by National Informatics Centre (NIC) Security Shield</div>
      </div>
    </div>
  );
};
