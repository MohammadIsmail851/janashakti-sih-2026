import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedProgress = ({ 
  percent = 0, 
  gradient = "from-blue-600 to-sky-500", 
  height = "h-2",
  className = "" 
}) => {
  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height} ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full rounded-full bg-gradient-to-r ${gradient} relative`}
      >
        <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full blur-[1px]"></span>
      </motion.div>
    </div>
  );
};
