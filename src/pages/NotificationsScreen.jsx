import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CreditCard, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCheck, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

export const NotificationsScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    unreadNotifsCount 
  } = useNotifications();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'payment'

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'payment') return n.type === 'payment';
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'verification':
      case 'success':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Title & Mark All Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('notifTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('notifSubtitle')}
            </p>
          </div>

          {unreadNotifsCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs font-bold text-blue-600 flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-100 transition-colors haptic-press self-start sm:self-auto"
            >
              <CheckCheck className="w-4 h-4" />
              <span>{t('markAllRead')}</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm max-w-md">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('filterAll')} ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('filterUnread')} ({unreadNotifsCount})
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              filter === 'payment'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('filterPayments')}
          </button>
        </div>

        {/* Notification Cards */}
        <div className="space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-card border border-slate-200/80 p-8">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-700">{t('noNotifs')}</div>
              <p className="text-xs text-slate-400 mt-1">{t('allUpToDate')}</p>
            </div>
          ) : (
            filteredNotifs.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  markNotificationAsRead(n.id);
                  if (n.actionLink) navigate(n.actionLink);
                }}
                className={`p-4 sm:p-5 rounded-card border transition-all cursor-pointer shadow-soft-sm hover:shadow-soft haptic-press ${
                  !n.read
                    ? 'bg-white border-blue-200 ring-1 ring-blue-500/20'
                    : 'bg-white/85 border-slate-200/80'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                      n.type === 'payment'
                        ? 'bg-emerald-50'
                        : n.type === 'warning'
                        ? 'bg-rose-50'
                        : 'bg-blue-50'
                    }`}
                  >
                    {getNotifIcon(n.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {n.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {n.timestamp}
                      </span>
                    </div>

                    <h4
                      className={`text-sm mt-1 leading-snug ${
                        !n.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'
                      }`}
                    >
                      {n.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-1">
                      <span className="text-xs text-blue-600 font-bold flex items-center">
                        <span>Tap to resolve / view</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </span>

                      {!n.read && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
