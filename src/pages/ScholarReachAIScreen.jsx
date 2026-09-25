import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  Users,
  MapPin,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  Eye,
  ChevronRight,
  Star,
  Filter,
  Search,
  TrendingUp,
  Bell,
  Sparkles,
  Target,
  FileText
} from 'lucide-react';

// Mock unreached eligible ST students
const UNREACHED_STUDENTS = [
  {
    id: 'UR-2025-OD-1001',
    name: 'Ranjita Majhi',
    tribe: 'Kondh (ST)',
    state: 'Odisha',
    district: 'Kandhamal',
    institute: 'Berhampur University',
    course: 'B.Tech (CSE), Year 2',
    income: '₹92,000',
    apaarId: 'APAAR-OD-2022-MAJ-4412',
    udiseCode: 'OD-KDH-2201-GCH',
    eligibleSchemes: ['Post-Matric Scholarship', 'NSFDC Pre-Matric'],
    reason: 'Never applied — unaware of schemes',
    riskScore: 94,
    contactMethod: 'SMS + Common Service Centre',
    lastSMSSent: null,
    status: 'unreached'
  },
  {
    id: 'UR-2025-JH-1002',
    name: 'Birsa Tudu',
    tribe: 'Santhali (ST)',
    state: 'Jharkhand',
    district: 'Dumka',
    institute: 'Ranchi University',
    course: 'M.A. (Political Science), Year 1',
    income: '₹1,10,000',
    apaarId: 'APAAR-JH-2021-TUD-0291',
    udiseCode: 'JH-DUM-0108-GCH',
    eligibleSchemes: ['Post-Matric Scholarship', 'NFST (Research)'],
    reason: 'Applied but incomplete — Income Certificate missing',
    riskScore: 88,
    contactMethod: 'WhatsApp Business API',
    lastSMSSent: null,
    status: 'incomplete'
  },
  {
    id: 'UR-2025-MP-1003',
    name: 'Champa Bai Gond',
    tribe: 'Gond (ST)',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    institute: 'Govt. Girls College, Mandla',
    course: 'B.Sc. (Agriculture), Year 3',
    income: '₹68,000',
    apaarId: 'APAAR-MP-2020-GON-8814',
    udiseCode: 'MP-MDL-0319-GOV',
    eligibleSchemes: ['Post-Matric Scholarship', 'Rajmata Vijayaraje Scindia Krishi Vishwavidyalaya Aid'],
    reason: 'Never applied — first-generation learner',
    riskScore: 96,
    contactMethod: 'Gram Panchayat Nodal Point',
    lastSMSSent: null,
    status: 'unreached'
  },
  {
    id: 'UR-2025-CG-1004',
    name: 'Hemant Baiga',
    tribe: 'Baiga (PVTG)',
    state: 'Chhattisgarh',
    district: 'Kawardha',
    institute: 'RGUKT Raipur',
    course: 'Diploma Engineering (Mech), Year 1',
    income: '₹45,000',
    apaarId: 'APAAR-CG-2023-BAI-0019',
    udiseCode: 'CG-KWD-0017-RGK',
    eligibleSchemes: ['Pre-Matric Scholarship', 'NSFDC Loan', 'Eklavya Model School Scholarship'],
    reason: 'PVTG — no digital access, no Aadhaar-linked bank account',
    riskScore: 99,
    contactMethod: 'District Tribal Welfare Officer',
    lastSMSSent: null,
    status: 'unreached'
  },
  {
    id: 'UR-2025-AP-1005',
    name: 'Lakshmi Koya',
    tribe: 'Koya (ST)',
    state: 'Andhra Pradesh',
    district: 'East Godavari',
    institute: 'Andhra Medical College',
    course: 'MBBS, Year 2',
    income: '₹1,55,000',
    apaarId: 'APAAR-AP-2022-KOY-3892',
    udiseCode: 'AP-EGD-0512-AMC',
    eligibleSchemes: ['Top Class Education Scholarship', 'NOS (Overseas eligible)'],
    reason: 'Applied for state scheme only — unaware of higher MoTA benefits',
    riskScore: 91,
    contactMethod: 'MoTA Mobile App Nudge',
    lastSMSSent: null,
    status: 'partial'
  }
];

const DISTRICT_STATS = [
  { district: 'Kandhamal, OD', unreached: 1842, eligible: 3210, coverage: 42.6 },
  { district: 'Dumka, JH', unreached: 2109, eligible: 3890, coverage: 45.8 },
  { district: 'Mandla, MP', unreached: 1654, eligible: 2780, coverage: 40.5 },
  { district: 'Kawardha, CG', unreached: 988, eligible: 1450, coverage: 31.9 },
  { district: 'East Godavari, AP', unreached: 3241, eligible: 5100, coverage: 36.5 }
];

const statusConfig = {
  unreached: { label: 'Unreached', bg: 'bg-rose-100', text: 'text-rose-800', dot: 'bg-rose-500' },
  incomplete: { label: 'Incomplete App.', bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  partial: { label: 'Partial Apply', bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' }
};

export const ScholarReachAIScreen = () => {
  const [students, setStudents] = useState(UNREACHED_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [notifying, setNotifying] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'districts'

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tribe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchState = filterState === 'all' || s.state === filterState;
    return matchSearch && matchState;
  });

  const runScan = async () => {
    setScanning(true);
    await new Promise(res => setTimeout(res, 2800));
    setScanning(false);
    setScanComplete(true);
  };

  const sendNudge = async (studentId, method) => {
    setNotifying(studentId);
    await new Promise(res => setTimeout(res, 1000));
    setStudents(prev => prev.map(s =>
      s.id === studentId ? { ...s, lastSMSSent: 'Just now', nudgeSent: true } : s
    ));
    setNotifying(null);
  };

  const states = [...new Set(UNREACHED_STUDENTS.map(s => s.state))];

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-700 p-5 rounded-card text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Radar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black font-['Plus_Jakarta_Sans',sans-serif]">ScholarReach AI</h1>
                <p className="text-xs text-violet-200">APAAR × UDISE+ × MoTA Registry — Gap Analysis Engine</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-2xl font-black">12,834</div>
              <div className="text-xs text-violet-200">Unreached ST Students Found</div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'APAAR Records Scanned', value: '4,82,100', icon: FileText, color: 'blue' },
            { label: 'Eligible But Unreached', value: '12,834', icon: Target, color: 'rose' },
            { label: 'Partial Applications', value: '3,219', icon: AlertCircle, color: 'amber' },
            { label: 'Nudges Sent This Month', value: '8,441', icon: Send, color: 'emerald' },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-4 rounded-card border border-slate-200/80 shadow-soft"
            >
              <div className={`text-xs text-slate-500 font-semibold mb-1`}>{m.label}</div>
              <div className={`text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] ${
                m.color === 'rose' ? 'text-rose-600' :
                m.color === 'amber' ? 'text-amber-600' :
                m.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'
              }`}>
                {m.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Scan CTA */}
        {!scanComplete && (
          <div className="bg-white border border-violet-200 rounded-card p-5 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span>Run AI Gap Scan</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cross-reference APAAR, UDISE+, and MoTA scholarship records to find unreached eligible ST students.
                </p>
              </div>
              <button
                onClick={runScan}
                disabled={scanning}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center space-x-2 haptic-press disabled:opacity-70 transition-all"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning databases...</span>
                  </>
                ) : (
                  <>
                    <Radar className="w-4 h-4" />
                    <span>Run AI Scan Now</span>
                  </>
                )}
              </button>
            </div>

            {scanning && (
              <div className="mt-4 space-y-2">
                {['Connecting to APAAR API Gateway...', 'Cross-referencing UDISE+ school records...', 'Querying MoTA Scholarship Registry...', 'Running eligibility inference model...'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.6 }}
                    className="flex items-center space-x-2 text-xs text-slate-600"
                  >
                    <Loader2 className="w-3 h-3 text-violet-500 animate-spin flex-shrink-0" />
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {scanComplete && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-card p-4 flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-bold text-emerald-800">Scan Complete — 12,834 unreached students identified</div>
              <div className="text-xs text-emerald-600">Sample records loaded below. Export to PFMS-compatible CSV or trigger batch SMS.</div>
            </div>
            <button
              onClick={() => setScanComplete(false)}
              className="text-xs text-emerald-700 font-bold underline"
            >
              Re-scan
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-2xl">
          {[
            { id: 'students', label: 'Student Records' },
            { id: 'districts', label: 'District Coverage' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-soft'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Student Records Tab */}
        {activeTab === 'students' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, district, tribe..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-violet-500"
                />
              </div>
              <select
                value={filterState}
                onChange={e => setFilterState(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="all">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Student Cards */}
            <div className="space-y-3">
              {filteredStudents.map((student, i) => {
                const status = statusConfig[student.status];
                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-card border border-slate-200/80 shadow-soft overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {/* Risk Score Ring */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex flex-col items-center justify-center border border-violet-200">
                            <div className="text-lg font-black text-violet-700 leading-none">{student.riskScore}</div>
                            <div className="text-[8px] text-violet-500 font-bold">SCORE</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 flex-wrap gap-1">
                              <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {student.tribe} • {student.district}, {student.state}
                            </div>
                            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                              {student.institute} — {student.course}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                          className="flex-shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {student.eligibleSchemes.map(scheme => (
                          <span key={scheme} className="text-[10px] font-bold px-2 py-0.5 bg-violet-50 text-violet-700 border border-violet-100 rounded-full">
                            {scheme}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span>{student.reason}</span>
                        </div>
                        <button
                          onClick={() => sendNudge(student.id, student.contactMethod)}
                          disabled={notifying === student.id || student.nudgeSent}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1.5 haptic-press transition-all ${
                            student.nudgeSent
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-violet-600 hover:bg-violet-700 text-white'
                          } disabled:opacity-70`}
                        >
                          {notifying === student.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : student.nudgeSent ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Bell className="w-3 h-3" />
                          )}
                          <span>{student.nudgeSent ? 'Nudge Sent' : 'Send Nudge'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    <AnimatePresence>
                      {selectedStudent?.id === student.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-100 bg-slate-50 overflow-hidden"
                        >
                          <div className="p-4 space-y-2.5 text-xs">
                            <div className="grid grid-cols-2 gap-2.5">
                              {[
                                { label: 'APAAR ID', value: student.apaarId },
                                { label: 'UDISE Code', value: student.udiseCode },
                                { label: 'Family Income', value: student.income },
                                { label: 'Contact Channel', value: student.contactMethod }
                              ].map(f => (
                                <div key={f.label} className="bg-white p-2.5 rounded-xl border border-slate-100">
                                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{f.label}</div>
                                  <div className="font-bold text-slate-800 mt-0.5">{f.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* District Coverage Tab */}
        {activeTab === 'districts' && (
          <div className="space-y-4">
            <div className="bg-white rounded-card border border-slate-200/80 shadow-soft overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">High-Priority Districts</h2>
                <p className="text-xs text-slate-500">Districts with {'<'}50% scholarship coverage among eligible ST students</p>
              </div>
              <div className="divide-y divide-slate-100">
                {DISTRICT_STATS.map((d, i) => (
                  <motion.div
                    key={d.district}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-xs font-bold text-slate-900">{d.district}</span>
                          {d.coverage < 40 && (
                            <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full">
                              CRITICAL
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 ml-5">
                          {d.unreached.toLocaleString()} unreached / {d.eligible.toLocaleString()} eligible
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-black text-slate-900">{d.coverage}%</div>
                        <div className="text-[10px] text-slate-500">covered</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${d.coverage < 40 ? 'bg-rose-500' : 'bg-amber-500'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${d.coverage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
