import React from 'react';
import { Video, Phone, MoreVertical, Search, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const ChatHeader = () => {
  const { state, dispatch } = useChatContext();
  const conv = state.conversations.find(c => c.id === state.activeConversation);

  if (!conv) return null;

  return (
    <>
      <div className="h-[72px] bg-[#07070F]/90 border-b border-[#7C3AED]/10 backdrop-blur-xl px-6 flex items-center justify-between flex-shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-transparent bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-[#0F0F1A] rounded-full flex items-center justify-center text-2xl">
                {conv.emoji}
              </div>
            </div>
            {conv.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-[3px] border-[#07070F] animate-pulse"></div>
            )}
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-lg font-bold gradient-text">
              {conv.characterName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-[#7C3AED]/15 text-[#A78BFA] text-[10px] font-medium tracking-wide">
                {conv.tagline}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#06B6D4]/10 text-[#67E8F9] text-[10px] font-medium tracking-wide">
                {conv.tags[0]}
              </span>
              <div className="flex items-center gap-1 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                <span className="text-[10px] text-[#9CA3AF] font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[Video, Phone, Search, MoreVertical].map((Icon, i) => (
            <button key={i} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#7C3AED] hover:glow-purple transition-all hover:bg-[#7C3AED]/10">
              <Icon className="w-[18px] h-[18px]" />
            </button>
          ))}
          <div className="w-[1px] h-6 bg-[#7C3AED]/20 mx-1 hidden xl:block"></div>
          <button 
            className="w-9 h-9 rounded-full bg-white/5 hidden xl:flex items-center justify-center text-[#9CA3AF] hover:text-white transition-all"
            onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
          >
            {state.rightPanelOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Analyzing Banner */}
      <AnimatePresence>
        {state.activeConversation === 'loading-new-chat' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-9 w-full bg-[#7C3AED]/10 border-b border-[#7C3AED]/20 flex items-center px-6 gap-3 absolute top-[72px] left-0 z-10"
          >
            <div className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping"></div>
            <span className="text-xs text-[#7C3AED] font-medium">AI analyzing personality matrix...</span>
            <div className="ml-auto w-48 h-1 bg-black/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
