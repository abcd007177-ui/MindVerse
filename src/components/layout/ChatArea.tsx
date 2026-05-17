import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../../hooks/useChat';
import { ChatHeader } from '../chat/ChatHeader';
import { ChatInput } from '../chat/ChatInput';
import { MessageBubble } from '../chat/MessageBubble';
import { getApiKey } from '../../lib/geminiChat';
import { KeyRound } from 'lucide-react';

export const ChatArea = () => {
  const { state } = useChatContext();
  
  const isGroup = state.activeConversation?.startsWith('g');
  const conv = isGroup 
    ? state.groups.find(g => g.id === state.activeConversation)
    : state.conversations.find(c => c.id === state.activeConversation);
    
  const messages = state.messages[state.activeConversation || ''] || [];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, state.isTyping]);

  if (!state.activeConversation || !conv) {
    return (
      <div className="flex-1 flex items-center justify-center bg-transparent">
        <div className="text-[#4B5563] text-sm flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full border border-[#7C3AED]/20 flex items-center justify-center bg-[#7C3AED]/5 mb-2">
            🧠
          </div>
          Select a mind to begin simulation
        </div>
      </div>
    );
  }

  // Get avatar for a given author name in a group
  const getAvatar = (name: string) => {
    if (!isGroup) return conv.emoji;
    const profile = state.conversations.find(c => c.characterName.toLowerCase() === name?.toLowerCase());
    return profile?.emoji || '👤';
  };
  
  const hasApiKey = !!getApiKey();

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent relative w-full">
      {/* Particle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: i % 2 === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(6,182,212,0.2)',
              animation: `float ${Math.random() * 5 + 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar relative z-10 w-full flex flex-col">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isAI={msg.role === 'ai'} 
            avatar={msg.role === 'ai' ? getAvatar(msg.name) : undefined}
            name={isGroup && msg.role === 'ai' ? msg.name : undefined}
          />
        ))}
        {state.isTyping && (
          <MessageBubble 
             isAI={true} 
             isTyping={true} 
             name={isGroup ? state.typingName : undefined} 
             avatar={getAvatar(state.typingName || '')} 
          />
        )}
        
        {!hasApiKey && (
           <div className="w-full max-w-md mx-auto my-8 glass rounded-2xl p-6 flex flex-col items-center text-center border-red-500/30">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                 <KeyRound className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-medium mb-2">API Key Required</h3>
              <p className="text-sm text-[#9CA3AF]">
                 Add your Gemini API key to .env as <code className="bg-black/30 px-1.5 py-0.5 rounded text-[#7C3AED]">VITE_GEMINI_API_KEY</code> to activate AI.
              </p>
           </div>
        )}
        
        <div ref={messagesEndRef} className="h-4 w-full flex-shrink-0" />
      </div>

      <div className="relative z-20 w-full">
        <ChatInput />
      </div>
    </div>
  );
};
