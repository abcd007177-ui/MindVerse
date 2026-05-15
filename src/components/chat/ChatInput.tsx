import React, { useState } from 'react';
import { Paperclip, Image as ImageIcon, Send } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';

export const ChatInput = () => {
  const { dispatch, state } = useChatContext();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || !state.activeConversation) return;

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId: state.activeConversation, message: newMessage }
    });

    setText('');
    
    // Simulate AI typing and response
    setTimeout(() => {
      dispatch({ type: 'SET_TYPING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_TYPING', payload: false });
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            conversationId: state.activeConversation!,
            message: {
              id: (Date.now() + 1).toString(),
              role: 'ai',
              content: 'Interesting perspective. We will explore this further.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          }
        });
      }, 2000);
    }, 500);
  };

  return (
    <div className="h-20 bg-[#07070F]/95 border-t border-[#7C3AED]/10 px-6 py-4 flex items-center gap-3 w-full">
      <button className="w-[36px] h-[36px] flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 text-[#9CA3AF] hover:text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors">
        <Paperclip className="w-5 h-5" />
      </button>
      <button className="w-[36px] h-[36px] flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 text-[#9CA3AF] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors">
        <ImageIcon className="w-5 h-5" />
      </button>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Message..."
        className="flex-1 bg-white/5 border border-[#7C3AED]/20 rounded-3xl py-3 px-5 text-sm text-white placeholder:text-[#4B5563] outline-none focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all"
      />
      
      <button 
        onClick={handleSend}
        disabled={!text.trim()}
        className="w-[44px] h-[44px] flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
      >
        <Send className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};
