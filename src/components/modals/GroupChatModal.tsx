import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const GroupChatModal = () => {
  const { dispatch } = useChatContext();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');

  const themes = ['Discipline', 'Strategy', 'Philosophy', 'Anime', 'Billionaire', 'Custom'];

  const handleCreate = () => {
    dispatch({ type: 'SET_MODAL', payload: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[500px] glass gradient-border flex flex-col relative"
      >
        <button 
          onClick={() => dispatch({ type: 'SET_MODAL', payload: null })}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold gradient-text mb-6">
            Form a Council
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Step 1: Council Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mastermind Group"
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Step 2: Theme</label>
              <div className="flex flex-wrap gap-2">
                {themes.map(t => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm transition-all",
                      theme === t 
                        ? "bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-white" 
                        : "glass text-[#E5E7EB] hover:bg-white/5"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Step 3: Add Members</label>
              <div className="h-24 glass rounded-xl flex items-center justify-center p-4 border border-dashed border-[#7C3AED]/30 text-sm text-[#4B5563]">
                Search to add members (max 6)
                <br/> *Not functional in demo*
              </div>
            </div>

            <button 
              onClick={handleCreate}
              className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold hover:glow-purple transition-all"
            >
              Summon Council
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
