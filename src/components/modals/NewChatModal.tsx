import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

const SUGGESTIONS = [
  { name: 'Ayanokoji', emoji: '🧊', tagline: 'Strategic Cold Thinker' },
  { name: 'David Goggins', emoji: '🔥', tagline: 'Discipline Incarnate' },
  { name: 'Tony Stark', emoji: '⚡', tagline: 'Genius Visionary' },
  { name: 'Batman', emoji: '🦇', tagline: 'Shadow Tactician' },
  { name: 'Naruto', emoji: '🌀', tagline: 'Unbreakable Will' },
  { name: 'Light Yagami', emoji: '👁️', tagline: 'God Complex' },
  { name: 'Marcus Aurelius', emoji: '🏛️', tagline: 'Stoic Emperor' },
  { name: 'Nikola Tesla', emoji: '💡', tagline: 'Mad Genius' },
  { name: 'Future Me', emoji: '🔮', tagline: 'Your Peak Potential' },
  { name: 'Sherlock Holmes', emoji: '🎯', tagline: 'Master Detective' },
  { name: 'Thomas Shelby', emoji: '👑', tagline: 'Calculated Leader' },
  { name: 'Elon Musk', emoji: '🧠', tagline: 'First Principles' },
];

export const NewChatModal = () => {
  const { dispatch } = useChatContext();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelect = (sug: any) => {
    setSelected(sug);
    setSearch(sug.name);
    setAnalyzing(true);
    
    // Simulate analyzing time
    setTimeout(() => {
      setAnalyzing(false);
    }, 1500);
  };

  const handleCreate = () => {
    // In a real app we'd add it. Here we just close and set to first conversation
    dispatch({ type: 'SET_MODAL', payload: null });
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: '1' });
    dispatch({ type: 'SET_PAGE', payload: 'chat' });
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
            Summon a Mind
          </h2>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C3AED]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (analyzing || selected) {
                  setAnalyzing(false);
                  setSelected(null);
                }
              }}
              placeholder="Enter any name — real, fictional, or legendary..."
              className="w-full h-14 bg-white/5 border border-[#7C3AED]/20 rounded-2xl pl-12 pr-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all"
            />
          </div>

          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass p-6 flex flex-col items-center justify-center text-center border-[#7C3AED]/30"
              >
                <div className="w-12 h-12 rounded-full border border-[#7C3AED]/30 flex items-center justify-center mb-4 relative">
                  <div className="w-3 h-3 bg-[#7C3AED] rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-[#7C3AED] rounded-full"></div>
                </div>
                <h3 className="text-[#E5E7EB] font-medium mb-4">Constructing personality matrix for {selected?.name}...</h3>
                <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                  />
                </div>
              </motion.div>
            ) : selected ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-6 flex flex-col items-center border-[#7C3AED]/30"
              >
                <div className="text-5xl mb-3">{selected.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-1">{selected.name}</h3>
                <p className="text-sm text-[#7C3AED] mb-4">{selected.tagline}</p>
                <div className="flex gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] text-[#E5E7EB]">Analytical</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] text-[#E5E7EB]">Driven</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] text-[#E5E7EB]">Confident</span>
                </div>
                <button 
                  onClick={handleCreate}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold hover:glow-purple transition-all"
                >
                  Begin Conversation
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-3 gap-2"
              >
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.name}
                    onClick={() => handleSelect(sug)}
                    className="h-10 glass rounded-xl flex items-center px-3 hover:border-[#7C3AED]/50 hover:bg-white/5 transition-all text-left"
                  >
                    <span className="text-sm mr-2">{sug.emoji}</span>
                    <span className="text-xs text-[#E5E7EB] font-medium truncate">{sug.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
