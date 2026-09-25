import React from 'react';

export const GlassPanel = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl border border-white/80 rounded-card shadow-soft-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
