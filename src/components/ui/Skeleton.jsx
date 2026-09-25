import React from 'react';

export const Skeleton = ({ className = "", variant = "rectangular", ...props }) => {
  const baseClasses = "relative overflow-hidden bg-slate-200/80 animate-pulse";
  
  let variantClasses = "rounded-xl";
  if (variant === "circular") variantClasses = "rounded-full";
  if (variant === "text") variantClasses = "rounded-md h-3.5";

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`p-5 rounded-card bg-white border border-slate-200/70 shadow-soft-sm space-y-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-16 w-full rounded-2xl" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-7 w-20 rounded-xl" />
      </div>
    </div>
  );
};
