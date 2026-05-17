import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const MessageBubble = ({ message, isAI, isTyping = false, avatar, name }: { message?: any, isAI: boolean, isTyping?: boolean, avatar?: string, name?: string }) => {
  return (
    <motion.div
      initial={isAI ? "aiInitial" : "userInitial"}
      animate="animate"
      variants={{
        aiInitial: { opacity: 0, x: -30 },
        userInitial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full mb-6", isAI ? "justify-start" : "justify-end")}
    >
      <div className={cn("flex max-w-[70%] gap-3", isAI ? "flex-row" : "flex-row-reverse")}>
        {isAI && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C3AED]/50 border border-[#7C3AED]/30 flex items-center justify-center text-sm shadow-lg">
            {avatar}
          </div>
        )}
        
        <div className="flex flex-col gap-1 w-full relative">
          <div className={cn(
            isAI 
              ? "glass p-4 rounded-2xl rounded-tl-[4px] border-[#7C3AED]/20 text-[#E5E7EB]" 
              : "bg-gradient-to-br from-[#7C3AED]/80 to-[#06B6D4]/60 p-4 rounded-2xl rounded-tr-[4px] shadow-lg text-white"
          )}>
            {name && isAI && <div className="text-[10px] text-[#A78BFA] font-bold mb-1 opacity-80 uppercase tracking-widest">{name}</div>}
            {isTyping ? (
              <div className="flex gap-1 items-center h-5">
                <div className="typing-dot" style={{ animation: "typingDot 1s infinite" }}></div>
                <div className="typing-dot" style={{ animation: "typingDot 1s infinite 0.2s" }}></div>
                <div className="typing-dot" style={{ animation: "typingDot 1s infinite 0.4s" }}></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message?.content}</p>
            )}
          </div>
          
          {!isTyping && (
            <span className={cn(
              "text-[10px]",
              isAI ? "text-[#4B5563] pl-1" : "text-[#9CA3AF] text-right pr-1"
            )}>
              {message?.timestamp}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
