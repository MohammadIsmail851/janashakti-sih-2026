import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const Toast = () => {
  const { toastMessage } = useNotifications();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  return (
    <AnimatePresence>
      <div className="fixed top-14 left-0 right-0 z-50 pointer-events-none px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          className="pointer-events-auto max-w-sm w-full bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-700/50"
        >
          {icons[toastMessage.type] || icons.info}
          <div className="flex-1 text-xs font-medium text-slate-100 leading-snug">
            {toastMessage.message}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
