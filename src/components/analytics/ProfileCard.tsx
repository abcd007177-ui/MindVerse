import React from 'react';

export const ProfileCard = ({ conv }: { conv: any }) => {
  return (
    <div className="glass p-5 gradient-border shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-3xl group-hover:bg-[#7C3AED]/30 transition-all"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#06B6D4]/10 rounded-full blur-3xl group-hover:bg-[#06B6D4]/20 transition-all"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#07070F] to-[#7C3AED]/50 p-1 mb-3 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
          <div className="w-full h-full border border-[#7C3AED]/30 rounded-full flex items-center justify-center text-4xl bg-[#0F0F1A]">
            {conv.emoji}
          </div>
        </div>
        
        <h2 className="text-xl font-bold gradient-text text-center mb-1">
          {conv.characterName}
        </h2>
        <p className="text-xs text-[#A78BFA] text-center mb-3 font-medium tracking-wide">
          {conv.tagline}
        </p>
        
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#9CA3AF]">
            {conv.category}
          </span>
          {conv.tags.map((tag: string, i: number) => (
            <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#9CA3AF]">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent my-2"></div>
        
        <p className="text-xs text-[#9CA3AF] italic text-center p-3">
          "{conv.philosophy}"
        </p>
      </div>
    </div>
  );
};
