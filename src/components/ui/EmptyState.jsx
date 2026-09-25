import React from 'react';
import { Sparkles, FolderOpen } from 'lucide-react';

export const EmptyState = ({ 
  icon: Icon = FolderOpen, 
  title = "No Records Found", 
  description = "There are currently no items to display.",
  actionText,
  onAction,
  className = "" 
}) => {
  return (
    <div className={`text-center py-12 px-6 bg-white rounded-card border border-slate-200/80 shadow-soft-sm flex flex-col items-center justify-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
        {title}
      </h3>
      <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 haptic-press"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
