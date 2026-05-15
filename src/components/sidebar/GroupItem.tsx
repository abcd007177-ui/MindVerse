import React from 'react';
import { cn } from '../../lib/utils';
import { useChatContext } from '../../hooks/useChat';

export const GroupItem = ({ data }: { data: any }) => {
  const { state, dispatch } = useChatContext();
  const isActive = state.activeConversation === data.id && state.activePage === 'chat';

  return (
    <button
      onClick={() => dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: data.id })}
      className={cn(
        "w-full h-14 flex items-center px-4 text-left transition-all duration-200 border-l-2",
        isActive 
          ? "bg-[#7C3AED]/10 border-[#7C3AED]" 
          : "bg-transparent border-transparent hover:bg-[#7C3AED]/5 hover:border-[#7C3AED]"
      )}
    >
      <div className="flex-shrink-0 flex items-center">
        <div className="relative w-8 h-8">
          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#7C3AED] border border-[#0f0f1a] flex items-center justify-center text-[10px] z-20">
            {data.emoji}
          </div>
          <div className="absolute left-3 top-2 w-6 h-6 rounded-full bg-[#06B6D4] border border-[#0f0f1a] flex items-center justify-center text-[10px] z-10">
            🧠
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0 ml-4">
        <span className="text-sm font-semibold text-[#F1F0FF] truncate block">{data.name}</span>
        <span className="text-xs text-[#4B5563] truncate block">{data.members.length} members</span>
      </div>
    </button>
  );
};
