import React, { useState } from 'react';
import { Paperclip, Image as ImageIcon, Send } from 'lucide-react';
import { useChatContext } from '../../hooks/useChat';
import { sendMessage, buildSystemPrompt, generatePersonalityProfile } from '../../lib/geminiChat';

export const ChatInput = () => {
  const { dispatch, state } = useChatContext();
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim() || !state.activeConversation) return;

    const currentText = text;
    setText(''); // clear input immediately
    
    const activeId = state.activeConversation;
    const isGroup = activeId.startsWith('g');

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId: activeId, message: newMessage }
    });
    
    // We get the current messages up to this point
    const conversationMessages = [...(state.messages[activeId] || []), newMessage];

    if (!isGroup) {
      // 1-ON-1 CHAT ENGINE
      dispatch({ type: 'SET_TYPING', payload: { isTyping: true } });
      
      const processMessage = async (retryCount = 0) => {
         try {
           const conversation = state.conversations.find((c: any) => c.id === activeId);
           let profile = conversation;
           // If profile doesn't have stats, it's dummy data. We might want to fallback, but let's assume it has them or we just build generic profile.
           if (!profile.stats) {
             try {
                profile = await generatePersonalityProfile(profile.characterName);
                dispatch({ type: 'ADD_CONVERSATION', payload: { ...profile, id: activeId, isOnline: true } });
             } catch(e) {
                profile = { ...conversation, 
                   communication_style: 'straightforward', 
                   philosophy: conversation.philosophy || 'I am focused', 
                   discipline: 50, intelligence: 50, charisma: 50, emotional_control: 50
                };
             }
           }
           
           const systemPrompt = buildSystemPrompt(conversation.characterName, profile);
           const aiResponseText = await sendMessage(conversationMessages, systemPrompt);
           
           dispatch({
             type: 'ADD_MESSAGE',
             payload: {
               conversationId: activeId,
               message: {
                  id: Date.now().toString(),
                  role: 'ai',
                  content: aiResponseText,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
               }
             }
           });
           dispatch({ type: 'SET_TYPING', payload: { isTyping: false } });
         } catch (error: any) {
           console.error('Chat error:', error);
           if (retryCount < 1) {
             dispatch({ type: 'SET_ERROR', payload: 'Connection lost. Retrying...' });
             setTimeout(() => {
                dispatch({ type: 'SET_ERROR', payload: null });
                processMessage(retryCount + 1);
             }, 2000);
           } else {
             dispatch({ type: 'SET_ERROR', payload: 'Request failed. Please try again.' });
             setTimeout(() => dispatch({ type: 'SET_ERROR', payload: null }), 3000);
             dispatch({ type: 'SET_TYPING', payload: { isTyping: false } });
           }
         }
      };
      
      processMessage();
    } else {
      // GROUP CHAT ENGINE
      const group = state.groups.find((g: any) => g.id === activeId);
      if (!group) return;
      
      const currentMessagesCtx = [...conversationMessages];
      
      const processGroupMessage = async () => {
         for (let i = 0; i < group.members.length; i++) {
            const memberName = group.members[i];
            dispatch({ type: 'SET_TYPING', payload: { isTyping: true, name: memberName } });
            
            const processMember = async (retryCount = 0): Promise<boolean> => {
               try {
                  // Find member profile from conversations if exists, otherwise generate basic
                  let memberProfile = state.conversations.find((c: any) => c.characterName.toLowerCase() === memberName.toLowerCase());
                  if (!memberProfile || !memberProfile.stats) {
                     try {
                        memberProfile = await generatePersonalityProfile(memberName);
                        dispatch({ type: 'ADD_CONVERSATION', payload: { ...memberProfile, id: Date.now().toString() } });
                     } catch (e) {
                        memberProfile = {
                           characterName: memberName,
                           communication_style: 'direct',
                           philosophy: 'Discussion is key.',
                           discipline: 60, intelligence: 80, charisma: 70, emotional_control: 60
                        };
                     }
                  }
                  
                  const systemPrompt = buildSystemPrompt(memberName, memberProfile) + 
                      "\n\nThis is a group discussion. Other members have already responded. Keep your response to 1-2 sentences and stay in character.";
                  
                  // Wait a bit as requested
                  if (i > 0 && retryCount === 0) {
                     await new Promise(res => setTimeout(res, 800));
                  }
                  
                  const aiResponseText = await sendMessage(currentMessagesCtx, systemPrompt);
                  
                  const aiMessage = {
                     id: Date.now().toString() + i,
                     role: 'ai',
                     name: memberName, // Store name for group UI mapping
                     content: aiResponseText,
                     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  
                  dispatch({
                    type: 'ADD_MESSAGE',
                    payload: { conversationId: activeId, message: aiMessage }
                  });
                  
                  currentMessagesCtx.push({ role: 'ai', content: `[${memberName}]: ${aiResponseText}` });
                  return true;
               } catch (error) {
                  console.error('Group chat member error:', error);
                  if (retryCount < 1) {
                     dispatch({ type: 'SET_ERROR', payload: `Connection lost while ${memberName} was answering. Retrying...` });
                     await new Promise(res => setTimeout(res, 2000));
                     dispatch({ type: 'SET_ERROR', payload: null });
                     return await processMember(retryCount + 1);
                  } else {
                     dispatch({ type: 'SET_ERROR', payload: `Failed to get response from ${memberName}.` });
                     setTimeout(() => dispatch({ type: 'SET_ERROR', payload: null }), 3000);
                     return false;
                  }
               }
            };
            
            await processMember();
         }
         dispatch({ type: 'SET_TYPING', payload: { isTyping: false } });
      };
      
      processGroupMessage();
    }
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
