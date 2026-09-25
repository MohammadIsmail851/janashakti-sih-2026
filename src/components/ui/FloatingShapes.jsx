import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShapes = ({ variant = "default", className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-0 ${className}`}>
      {/* Background Micro-Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

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

      {/* Outlined Geometric Shapes (Linear / CRED style) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-16 right-1/4 w-28 h-28 border border-dashed border-blue-400/20 rounded-full"
      />

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-8 w-16 h-16 border border-slate-300/40 rounded-2xl rotate-12"
      />

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 right-10 w-20 h-10 border border-slate-300/30 rounded-xl"
      />

      {/* Concentric Animated Rings */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 border border-blue-500/10 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 border border-blue-500/5 rounded-full pointer-events-none" />
    </div>
  );
};
