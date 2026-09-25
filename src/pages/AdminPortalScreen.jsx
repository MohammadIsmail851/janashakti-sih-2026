import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Clock, 
  FileText, 
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Building2,
  ChevronRight,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const AdminPortalScreen = () => {
  const { t } = useLanguage();
  const { 
    adminQueue, 
    adminMetrics, 
    adminApprove, 
    adminReject, 
    adminManualReview,
    student,
    simulateAisheVerification
  } = useScholarship();
  const { currentUser, loginAsStudent } = useAuth();
  const { showToast } = useNotifications();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudentForReview, setSelectedStudentForReview] = useState(null);
  const [reviewNote, setReviewNote] = useState('');

  const filteredQueue = adminQueue.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleOpenReviewModal = (studentItem) => {
    setSelectedStudentForReview(studentItem);
    setReviewNote(studentItem.discrepancy || "Attendance confirmed > 85%, fee structure validated.");
  };

  const handleApprove = (studentId) => {
    adminApprove(studentId);
    setSelectedStudentForReview(null);
  };

  const handleReject = (studentId) => {
    adminReject(studentId, reviewNote || "Document criteria not fulfilled.");
    setSelectedStudentForReview(null);
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-slate-200/80 shadow-soft">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                MoTA Central PMU
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Aadhaar NPCI & AISHE Nodal Clearing
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('adminTitle')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('adminSubtitle')}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">National Nodal Officer (Verified)</div>
            </div>
            <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              GOI
            </span>
          </div>
        </div>

        {/* Analytics Dashboard Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-card border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span className="font-semibold">{t('totalApplications')}</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {adminMetrics.totalApplications}
            </div>
            <div className="mt-2 text-[10px] text-emerald-700 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +14.2% YoY Tribal Outreach
            </div>
          </div>

          <div className="bg-white p-4 rounded-card border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span className="font-semibold">{t('dbtDisbursedTotal')}</span>
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600 font-['Plus_Jakarta_Sans',sans-serif]">
              {adminMetrics.dbtDisbursedTotal}
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-medium">
              100% via Aadhaar APBS Gateway
            </div>
          </div>

          <div className="bg-white p-4 rounded-card border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span className="font-semibold">{t('pendingVerifications')}</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-600 font-['Plus_Jakarta_Sans',sans-serif]">
              {adminMetrics.pendingVerifications}
            </div>
            <div className="mt-2 text-[10px] text-amber-700 font-bold">
              Avg Turnaround: 2.4 Days
            </div>
          </div>

          <div className="bg-white p-4 rounded-card border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span className="font-semibold">Top Institutes Active</span>
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-700 font-['Plus_Jakarta_Sans',sans-serif]">
              {adminMetrics.topInstitutesNotified}
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-medium">
              IITs, NITs, IIMs, AIIMS, NLUs
            </div>
          </div>
        </div>

        {/* Verification Queue & Student List */}
        <div className="bg-white rounded-card border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                {t('studentVerificationQueue')}
              </h2>
              <p className="text-xs text-slate-500">
                Real-time queue synchronized with Student Mobile App state
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, college, ID..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 w-44 sm:w-56"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="Pending Action">Pending Action</option>
                <option value="Verified">Verified</option>
                <option value="Manual Review">Manual Review</option>
              </select>
            </div>
          </div>

          {/* Responsive Table / Card List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Student & Community</th>
                  <th className="py-3 px-4">Institute & Course</th>
                  <th className="py-3 px-4">Scheme Applied</th>
                  <th className="py-3 px-4">Pending Stage Node</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQueue.map((studentItem) => {
                  const isAarav = studentItem.id === "ST-2025-OD-8921";

                  return (
                    <tr 
                      key={studentItem.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isAarav ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{studentItem.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {studentItem.id} • <span className="text-amber-800 font-semibold">{studentItem.tribe}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{studentItem.institute}</div>
                        <div className="text-[10px] text-slate-500">
                          {studentItem.state} • Attendance: <span className="font-bold text-emerald-700">{studentItem.attendance}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {studentItem.scheme}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Income: {studentItem.income}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>{studentItem.pendingNode}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            studentItem.status === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : studentItem.status === 'Manual Review'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {studentItem.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {studentItem.status !== 'Verified' && (
                            <button
                              onClick={() => handleApprove(studentItem.id)}
                              className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm haptic-press"
                              title="Approve Nodal Clearance"
                            >
                              Approve
                            </button>
                          )}

                          <button
                            onClick={() => handleOpenReviewModal(studentItem)}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] haptic-press"
                          >
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Manual Review & Inspection Dialog */}
        <AnimatePresence>
          {selectedStudentForReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-card max-w-lg w-full p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Nodal Clearance Review: {selectedStudentForReview.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {selectedStudentForReview.id} • {selectedStudentForReview.institute}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudentForReview(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheme:</span>
                      <span className="font-bold text-slate-900">{selectedStudentForReview.scheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Family Income:</span>
                      <span className="font-bold text-slate-900">{selectedStudentForReview.income}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Attendance:</span>
                      <span className="font-bold text-emerald-700">{selectedStudentForReview.attendance}</span>
                    </div>
                  </div>

                  {selectedStudentForReview.discrepancy && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">
                      <div className="font-bold flex items-center mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                        AI Discrepancy Flag
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {selectedStudentForReview.discrepancy}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Nodal Officer Decision Notes
                    </label>
                    <textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                      placeholder="Add institutional justification, semester marks verification..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => handleApprove(selectedStudentForReview.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-md shadow-emerald-600/20 haptic-press"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Clear Node</span>
                  </button>

                  <button
                    onClick={() => handleReject(selectedStudentForReview.id)}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center space-x-1 haptic-press border border-rose-200"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
