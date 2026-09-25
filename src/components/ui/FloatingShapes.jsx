import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShapes = ({ variant = "default", className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 ${className}`}>
      {/* Background Tech Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-70" />

      {/* Floating Hollow Circles */}
      <div className="absolute top-20 right-12 w-20 h-20 rounded-full border-2 border-blue-500/20 animate-float-hollow" />
      <div className="absolute top-48 left-16 w-12 h-12 rounded-full border-2 border-indigo-500/25 animate-float-hollow" style={{ animationDelay: '-3s' }} />
      <div className="absolute bottom-32 right-1/3 w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/25 animate-float-hollow" style={{ animationDelay: '-6s' }} />

      {/* Soft Animated Rectangles */}
      <div className="absolute top-28 right-1/4 w-24 h-14 rounded-2xl border border-slate-300/40 bg-white/30 backdrop-blur-xs animate-soft-rect" />
      <div className="absolute bottom-20 left-12 w-32 h-16 rounded-2xl border border-blue-200/50 bg-blue-50/20 backdrop-blur-xs animate-soft-rect" style={{ animationDelay: '-4s' }} />

      {/* Soft Gradient Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.45, 0.35],
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-sky-300/15 to-transparent rounded-full blur-3xl"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.35, 0.25],
          x: [0, -12, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-indigo-500/15 via-emerald-400/10 to-transparent rounded-full blur-3xl"
      />

      {/* Outlined Geometric Shapes (Linear / Modern Fintech style) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-16 right-1/4 w-28 h-28 border border-dashed border-blue-400/20 rounded-full"
      />

      {/* Concentric Animated Rings */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 border border-blue-500/10 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 border border-blue-500/5 rounded-full pointer-events-none" />
    </div>
  );
};
