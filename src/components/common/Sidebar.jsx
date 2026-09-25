import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FolderLock, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Bell, 
  User, 
  ShieldAlert, 
  LogOut, 
  Globe, 
  Check, 
  DownloadCloud,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useScholarship } from '../../context/ScholarshipContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isAdmin, logout, loginAsStudent, loginAsAdmin } = useAuth();
  const { unreadNotifsCount, showToast } = useNotifications();
  const { student } = useScholarship();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: LayoutDashboard, path: '/home' },
    { id: 'schemes', label: t('navSchemes'), icon: GraduationCap, path: '/scholarships' },
    { id: 'wallet', label: t('navWallet'), icon: FolderLock, path: '/wallet' },
    { id: 'verify', label: t('navVerify'), icon: ShieldCheck, path: '/verification' },
    { id: 'dbt', label: t('navDbt'), icon: CreditCard, path: '/dbt' },
    { id: 'chatbot', label: t('navChatbot'), icon: Sparkles, path: '/chatbot', badge: 'AI' },
    { id: 'notifications', label: t('navNotifications'), icon: Bell, path: '/notifications', count: unreadNotifsCount },
    { id: 'profile', label: t('navProfile'), icon: User, path: '/profile' },
    { id: 'admin', label: t('navAdmin'), icon: ShieldAlert, path: '/admin', highlight: true },
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200/80 min-h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div 
          onClick={() => navigate('/home')} 
          className="flex items-center space-x-3 cursor-pointer haptic-press"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20">
            JS
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                {t('portalName')}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-800 rounded-full">
                MoTA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold truncate max-w-[150px]">
              {t('portalTagline')}
            </p>
          </div>
        </div>
      </div>

      {/* User Badge / Role Switcher Card */}
      <div className="p-4 mx-4 my-3 rounded-2xl bg-slate-50 border border-slate-200/70">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatar || student.avatar}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {currentUser?.name || student.name}
              </h4>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[10px] text-blue-600 font-semibold truncate">
              {isAdmin ? 'MoTA Director / Nodal' : `${student.category} • ${student.instituteCode}`}
            </p>
          </div>
        </div>

        {/* Quick Role Toggle for Demo Evaluators */}
        <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-medium">Demo Mode:</span>
          {isAdmin ? (
            <button
              onClick={() => {
                loginAsStudent();
                navigate('/home');
                showToast("Switched to Student Portal view (Aarav Hembram)", "info");
              }}
              className="text-blue-600 hover:text-blue-700 font-bold underline cursor-pointer"
            >
              Switch to Student
            </button>
          ) : (
            <button
              onClick={() => {
                loginAsAdmin();
                navigate('/admin');
                showToast("Switched to MoTA Administrator & Verification Desk", "info");
              }}
              className="text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer"
            >
              Switch to Admin
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Main Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/home' && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all haptic-press ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-bold'
                  : item.highlight
                  ? 'text-amber-700 hover:bg-amber-50 hover:text-amber-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-700'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.count > 0 && (
                <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Language Selection & PWA Install in Sidebar Footer */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        {/* Language selector pills */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center">
            <Globe className="w-3 h-3 mr-1 text-slate-400" />
            Language / भाषा / భాష
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  showToast(`Language set to ${l.native}`, "info");
                }}
                className={`py-1 text-[11px] font-bold rounded-lg transition-all ${
                  language === l.code
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>

        {/* PWA Badge */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-1.5 text-slate-600 font-semibold">
            <DownloadCloud className="w-3.5 h-3.5 text-blue-600" />
            <span>PWA Enabled</span>
          </div>
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Installable
          </span>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
            showToast("Signed out successfully", "info");
          }}
          className="w-full py-2 px-3 rounded-xl hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors haptic-press"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t('navLogout')}</span>
        </button>
      </div>
    </aside>
  );
};
