import React from 'react';
import { Brain, Edit, Plus, Settings } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';
import { SidebarSearch } from '../sidebar/SidebarSearch';
import { ConversationItem } from '../sidebar/ConversationItem';
import { GroupItem } from '../sidebar/GroupItem';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const LeftSidebar = () => {
  const { state, dispatch } = useChatContext();

  const chips = [
    { label: 'Recent', icon: '⚡' },
    { label: 'Groups', icon: '👥' },
    { label: 'Future Self', icon: '🔮', action: () => dispatch({ type: 'SET_PAGE', payload: 'futureSelf' }) },
    { label: 'Saved', icon: '⭐' }
  ];

  return (
    <div className="w-[280px] h-full flex flex-col bg-[#07070F]/95 border-r border-[#7C3AED]/15 flex-shrink-0 z-10">
      {/* Top Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#7C3AED]/10">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-[#7C3AED]" />
          <span className="text-lg font-bold gradient-text">
            MindVerse
          </span>
        </div>
        <button 
          onClick={() => dispatch({ type: 'SET_MODAL', payload: 'newChat' })}
          className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#7C3AED] hover:glow-purple transition-all bg-white/5 hover:bg-[#7C3AED]/10 group relative"
        >
          <Edit className="w-4 h-4" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            New Chat
          </span>
        </button>
      </div>

      <SidebarSearch />

      {/* Chips */}
      <div className="flex overflow-x-auto px-3 pb-2 gap-2 custom-scrollbar">
        {chips.map((chip, idx) => {
          const isActive = state.activePage === 'futureSelf' && chip.label === 'Future Self';
          return (
            <button
              key={idx}
              onClick={chip.action || (() => { if(state.activePage !== 'chat') dispatch({ type: 'SET_PAGE', payload: 'chat' }); })}
              className={cn(
                "h-7 whitespace-nowrap px-3 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1.5",
                isActive || (chip.label === 'Recent' && state.activePage === 'chat')
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] border-transparent text-white"
                  : "bg-white/5 border-[#7C3AED]/20 text-[#E5E7EB] hover:border-[#7C3AED]/50"
              )}
            >
              <span>{chip.icon}</span>
              {chip.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Active Minds */}
        <div className="pt-2">
          <div className="text-[10px] font-bold tracking-widest text-[#4B5563] px-4 py-1.5">
            ACTIVE MINDS
          </div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{staggerChildren: 0.05}}>
            {state.conversations.map(conv => (
              <ConversationItem key={conv.id} data={conv} />
            ))}
          </motion.div>
        </div>

        {/* Councils */}
        <div className="pt-4 pb-4">
          <div className="flex items-center justify-between px-4 py-1.5">
            <div className="text-[10px] font-bold tracking-widest text-[#4B5563]">
              COUNCILS
            </div>
            <button 
              onClick={() => dispatch({ type: 'SET_MODAL', payload: 'groupChat' })}
              className="text-[#4B5563] hover:text-[#7C3AED] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            {state.groups.map(group => (
              <GroupItem key={group.id} data={group} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-16 flex items-center px-4 border-t border-[#7C3AED]/10 bg-gradient-to-t from-[#7C3AED]/10 to-transparent">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-bold text-sm">
          ME
        </div>
        <div className="flex-1 ml-3 font-medium text-sm text-[#E5E7EB]">
          User01
        </div>
        <button className="p-2 text-[#9CA3AF] hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
