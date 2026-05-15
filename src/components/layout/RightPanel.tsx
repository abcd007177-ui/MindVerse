import React from 'react';
import { useChatContext } from '../../hooks/useChat';
import { ProfileCard } from '../analytics/ProfileCard';
import { PersonalityRadar } from '../analytics/PersonalityRadar';
import { StatBar } from '../analytics/StatBar';
import { similarMinds } from '../../data/dummyData';

export const RightPanel = () => {
  const { state } = useChatContext();
  const conv = state.conversations.find(c => c.id === state.activeConversation);

  if (!conv) return null;

  return (
    <div className="w-[320px] h-full bg-[#07070F]/95 border-l border-[#7C3AED]/10 overflow-y-auto custom-scrollbar pt-6 pb-20 px-4 z-20">
      <ProfileCard conv={conv} />

      {/* Personality Matrix */}
      <div className="mt-8">
        <div className="text-[10px] font-bold tracking-widest text-[#4B5563] mb-2 px-1">
          PERSONALITY MATRIX
        </div>
        <div className="glass p-2">
          <PersonalityRadar stats={conv.stats} />
        </div>
      </div>

      {/* Core Attributes */}
      <div className="mt-8">
        <div className="text-[10px] font-bold tracking-widest text-[#4B5563] mb-4 px-1">
          CORE ATTRIBUTES
        </div>
        <div className="glass p-4">
          <StatBar label="Intelligence" value={conv.stats.intelligence} delay={0.1} />
          <StatBar label="Strategic Thinking" value={conv.stats.strategic} delay={0.2} />
          <StatBar label="Emotional Control" value={conv.stats.emotional_control} delay={0.3} />
          <StatBar label="Discipline" value={conv.stats.discipline} delay={0.4} />
          <StatBar label="Creativity" value={conv.stats.creativity} delay={0.5} />
          <StatBar label="Confidence" value={conv.stats.confidence} delay={0.6} />
          <StatBar label="Leadership" value={conv.stats.leadership} delay={0.7} />
          <StatBar label="Charisma" value={conv.stats.charisma} delay={0.8} />
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8">
        <div className="text-[10px] font-bold tracking-widest text-[#4B5563] mb-3 px-1">
          CONVERSATION INSIGHTS
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="glass p-3 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[#9CA3AF] mb-1">Total Msgs</span>
            <span className="text-sm font-bold text-[#E5E7EB]">47</span>
          </div>
          <div className="glass p-3 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[#9CA3AF] mb-1">Avg Response</span>
            <span className="text-sm font-bold text-[#E5E7EB]">1.2s</span>
          </div>
          <div className="glass p-3 flex flex-col items-center justify-center text-center col-span-2">
            <span className="text-[10px] text-[#9CA3AF] mb-1">Mood</span>
            <span className="text-sm font-bold text-[#E5E7EB]">Analytical & Cold</span>
          </div>
        </div>
      </div>

      {/* Similar Minds */}
      <div className="mt-8">
        <div className="text-[10px] font-bold tracking-widest text-[#4B5563] mb-3 px-1">
          SIMILAR MINDS
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {similarMinds.map(mind => (
            <button key={mind.id} className="min-w-[80px] glass p-2 flex flex-col items-center hover:border-[#7C3AED]/50 hover:bg-white/5 transition-all">
              <span className="text-2xl mb-1">{mind.emoji}</span>
              <span className="text-[10px] font-semibold text-[#E5E7EB] truncate w-full text-center">{mind.name}</span>
              <span className="text-[8px] text-[#9CA3AF] mt-0.5">{mind.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
