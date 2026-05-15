import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export const PersonalityRadar = ({ stats }: { stats: any }) => {
  const data = [
    { subject: 'Intel', A: stats.intelligence, fullMark: 100 },
    { subject: 'Strat', A: stats.strategic, fullMark: 100 },
    { subject: 'Ctrl', A: stats.emotional_control, fullMark: 100 },
    { subject: 'Disc', A: stats.discipline, fullMark: 100 },
    { subject: 'Char', A: stats.charisma, fullMark: 100 },
    { subject: 'Conf', A: stats.confidence, fullMark: 100 },
    { subject: 'Lead', A: stats.leadership, fullMark: 100 },
    { subject: 'Crea', A: stats.creativity, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(124,58,237,0.15)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10 }} />
          {/* Average "ghost" comparison */}
          <Radar name="Average" dataKey="fullMark" stroke="#06B6D4" strokeWidth={1} strokeDasharray="4" fill="rgba(6, 182, 212, 0.1)" />
          <Radar name="Level" dataKey="A" stroke="#7C3AED" strokeWidth={2} fill="rgba(124, 58, 237, 0.2)" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
