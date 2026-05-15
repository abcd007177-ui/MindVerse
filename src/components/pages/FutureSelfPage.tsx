import React from 'react';
import { motion } from 'motion/react';
import { useChatContext } from '../../hooks/useChat';

export const FutureSelfPage = () => {
  const { dispatch } = useChatContext();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-10 custom-scrollbar"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#06B6D4]/30 border border-[#7C3AED]/30 flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
          >
            🔮
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Simulate Your Future Self
          </h1>
          <p className="text-[#9CA3AF] text-lg">
            What if you could talk to the version of yourself who made it?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Your current biggest goals</label>
              <textarea 
                rows={3} 
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all resize-none custom-scrollbar"
                placeholder="I want to build a startup and get in shape..."
              />
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Your deepest fears right now</label>
              <textarea 
                rows={3} 
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all resize-none custom-scrollbar"
                placeholder="Failing and wasting my potential..."
              />
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Your daily habits</label>
              <textarea 
                rows={2} 
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all resize-none custom-scrollbar"
                placeholder="Waking up at 8am, working 6 hours, scrolling..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Your biggest weaknesses</label>
              <textarea 
                rows={3} 
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all resize-none custom-scrollbar"
                placeholder="Procrastination, overthinking..."
              />
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Your ambitions in 5 years</label>
              <textarea 
                rows={3} 
                className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:glow-purple transition-all resize-none custom-scrollbar"
                placeholder="Financial independence, a strong body..."
              />
            </div>
            <div>
              <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-bold">Years into the future</label>
              <select className="w-full bg-white/5 border border-[#7C3AED]/20 rounded-xl p-4 text-white outline-none focus:border-[#7C3AED] focus:glow-purple transition-all appearance-none">
                <option value="1" className="bg-[#0F0F1A]">1 Year (Short-term trajectory)</option>
                <option value="3" className="bg-[#0F0F1A]">3 Years (Mid-term transformation)</option>
                <option value="5" className="bg-[#0F0F1A]" selected>5 Years (The Ideal Self)</option>
                <option value="10" className="bg-[#0F0F1A]">10 Years (Decade projection)</option>
                <option value="20" className="bg-[#0F0F1A]">20 Years (Legacy Self)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <label className="block text-xs text-[#9CA3AF] mb-4 uppercase tracking-wider font-bold text-center">Future Self Persona Focus</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🏆 Peak Version', '💰 Billionaire Me', '🧘 Wisest Me', '💪 Most Disciplined Me'].map(mode => (
              <button key={mode} className="glass py-4 px-2 text-sm font-medium text-[#E5E7EB] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10 transition-all rounded-xl text-center">
                {mode}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            dispatch({ type: 'SET_PAGE', payload: 'chat' });
          }}
          className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-lg font-bold hover:glow-purple hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out transform skew-x-12"></div>
          Simulate Future Self
        </button>
      </div>
    </motion.div>
  );
};
