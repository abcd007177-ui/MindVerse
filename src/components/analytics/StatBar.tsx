import React from 'react';
import { motion } from 'motion/react';

export const StatBar = ({ label, value, delay = 0 }: { label: string, value: number, delay?: number }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1 text-[11px]">
        <span className="text-[#9CA3AF]">{label}</span>
        <span className="text-[#A78BFA] font-bold">{value}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full"
        />
      </div>
    </div>
  );
};
