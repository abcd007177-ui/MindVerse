import React from 'react';
import { useChatContext } from '../../hooks/useChat';
import { cn } from '../../lib/utils';

export const ConversationItem = ({ data }: { data: any }) => {
  const { state, dispatch } = useChatContext();
  const isActive = state.activeConversation === data.id && state.activePage === 'chat';

  return (
    <button
      onClick={() => dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: data.id })}
      className={cn(
        "w-full h-[68px] flex items-center px-4 py-2.5 text-left transition-all duration-200 border-l-2",
        isActive 
          ? "bg-[#7C3AED]/10 border-[#7C3AED]" 
          : "bg-transparent border-transparent hover:bg-[#7C3AED]/5 hover:border-[#7C3AED]"
      )}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xl">
          {data.emoji}
        </div>
        {data.isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#07070F]"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 ml-3 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#F1F0FF] truncate">{data.characterName}</span>
          <span className="text-[10px] text-[#4B5563] ml-2">{data.timestamp}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-[#9CA3AF] truncate max-w-[140px] block">{data.lastMessage}</span>
          {data.unread > 0 && (
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-[9px] font-bold text-white ml-2">
              {data.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
