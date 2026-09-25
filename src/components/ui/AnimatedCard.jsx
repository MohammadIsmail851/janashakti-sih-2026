import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedCard = ({ 
  children, 
  className = "", 
  onClick, 
  hoverLift = true,
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverLift ? { y: -4, transition: { duration: 0.2 } } : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-card p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
