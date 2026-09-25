import React, { useEffect, useState } from 'react';

export const StatCounter = ({ 
  targetValue = 0, 
  duration = 1000, 
  prefix = "₹", 
  suffix = "", 
  className = "" 
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.floor(easeProgress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  const formatted = new Intl.NumberFormat('en-IN').format(currentValue);

  return (
    <span className={`font-['Plus_Jakarta_Sans',sans-serif] ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
