import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SidebarSearch = ({ value, onChange }: { value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="p-3">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#7C3AED] transition-colors" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search minds..."
          className={cn(
            "w-full bg-white/5 border border-[#7C3AED]/15 rounded-xl pl-9 pr-4 py-2",
            "text-sm text-[#F1F0FF] placeholder:text-[#4B5563] outline-none",
            "focus:border-[#7C3AED] focus:glow-purple transition-all duration-300"
          )}
        />
      </div>
    </div>
  );
};
