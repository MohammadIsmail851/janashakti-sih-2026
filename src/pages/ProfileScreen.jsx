import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  Landmark, 
  ShieldCheck, 
  LogOut, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { student } = useScholarship();
  const { currentUser, isAdmin, logout, loginAsAdmin } = useAuth();
  const { showToast } = useNotifications();

  const handleLogout = () => {
    logout();
    showToast("Signed out safely. e-KYC session ended.", "info");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-28 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Profile Hero Card */}
        <div className="bg-white rounded-card p-6 border border-slate-200/80 shadow-soft text-center relative overflow-hidden">
          <div className="relative w-24 h-24 mx-auto rounded-3xl overflow-hidden ring-4 ring-blue-500/20 shadow-md">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-white text-[9px] font-bold py-0.5">
              {t('stVerified')}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-3 font-['Plus_Jakarta_Sans',sans-serif]">
            {student.name}
          </h2>
          <div className="text-xs text-blue-600 font-semibold mt-0.5">
            {student.hindiName} • {student.odiaName}
          </div>

          <div className="mt-3 flex items-center justify-center space-x-2 flex-wrap gap-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {student.category} ({student.subTribe})
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              ID: {student.id}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              UIDAI e-KYC
            </span>
          </div>
        </div>

        {/* Dual Column on Desktop: Academic Credentials & Family Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Academic Profile */}
          <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>{t('institutionalCredentials')}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Institute:</span>
                <span className="font-bold text-slate-800 text-right max-w-[220px]">{student.institute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AISHE Institute Code:</span>
                <span className="font-mono font-bold text-blue-700">{student.aisheCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="font-semibold text-slate-800">{student.course}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll No / Semester:</span>
                <span className="font-semibold text-slate-800">{student.rollNo} ({student.academicYear})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cumulative CGPA:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {student.cgpa} / 10.0
                </span>
              </div>
            </div>
          </div>

          {/* Family & Socio-Economic Details */}
          <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{t('familyBackground')}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Father's Name & Occupation:</span>
                <span className="font-semibold text-slate-800">{student.family.fatherName} ({student.family.fatherOccupation})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mother's Name:</span>
                <span className="font-semibold text-slate-800">{student.family.motherName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Family Income:</span>
                <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {student.family.incomeFormatted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ration Card Type:</span>
                <span className="font-semibold text-slate-800">{student.family.rationCardType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Permanent Residence:</span>
                <span className="font-semibold text-slate-800">{student.block}, Dist. {student.district}, {student.domicileState}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bank & NPCI DBT Integration */}
        <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-emerald-600" />
              <span>{t('aadhaarNpciLinkage')}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Direct Transfer Active
            </span>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Designated Bank:</span>
              <span className="font-bold text-slate-900">{student.bankDetails.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Account Number:</span>
              <span className="font-mono font-bold text-slate-800">{student.bankDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Branch IFSC:</span>
              <span className="font-mono font-bold text-slate-800">{student.bankDetails.ifsc}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">NPCI Aadhaar Mapper:</span>
              <span className="font-bold text-emerald-700">Seeded & Active ✓</span>
            </div>
          </div>
        </div>

        {/* Action Logout */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              loginAsAdmin();
              navigate('/admin');
              showToast("Switched to MoTA Administrator & Verification Desk", "info");
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center space-x-2 border border-amber-200 haptic-press"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Open MoTA Nodal Portal</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-200 haptic-press"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('navLogout')}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 space-y-0.5 pt-3">
          <div>JanaShakti v2.8.0 • SIH 2026 Problem Statement 26238</div>
          <div>Ministry of Tribal Affairs, Government of India</div>
        </div>

      </div>
    </div>
  );
};
