import React from 'react';
import { motion } from 'framer-motion';

export const GradientHeading = ({ 
  text, 
  as = "h1", 
  className = "", 
  animateLetters = false,
  gradient = "from-blue-600 via-indigo-600 to-sky-500"
}) => {
  const Tag = as;

  if (animateLetters && typeof text === 'string') {
    const letters = text.split("");
    return (
      <Tag className={`font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif] ${className}`}>
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.02, ease: "easeOut" }}
            className={`inline-block bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={`font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {text}
    </Tag>
  );
};
