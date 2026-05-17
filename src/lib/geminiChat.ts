export const getApiKey = () => {
  // Try Vite env first, then process.env
  const key = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
  return key;
};

export async function generatePersonalityProfile(characterName: string) {
  const prompt = `Analyze the personality of '${characterName}' and return ONLY valid JSON:
{
  "tagline": "string (2-3 words, e.g. Strategic Cold Thinker)",
  "category": "string (anime|philosopher|superhero|entrepreneur|historical|fictional|motivator)",
  "communication_style": "string (one sentence)",
  "philosophy": "string (one sentence core belief — first person)",
  "avatar_emoji": "string (single most fitting emoji)",
  "discipline": "number 0-100",
  "intelligence": "number 0-100",
  "emotional_control": "number 0-100",
  "charisma": "number 0-100",
  "strategic_thinking": "number 0-100",
  "leadership": "number 0-100",
  "creativity": "number 0-100",
  "confidence": "number 0-100",
  "aggression": "number 0-100",
  "humor": "number 0-100",
  "similar_minds": [{"name": "string", "emoji": "string", "tag": "string"}],
  "tags": ["string", "string", "string"]
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getApiKey()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  const text = data.candidates[0].content.parts[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]);
}

export function buildSystemPrompt(characterName: string, profile: any) {
  return `You are ${characterName}. 

Your personality: ${profile.communication_style}
Your core philosophy: ${profile.philosophy}
Your traits: Discipline ${profile.discipline}/100, Intelligence ${profile.intelligence}/100, Charisma ${profile.charisma}/100, Emotional Control ${profile.emotional_control}/100

RULES — follow without exception:
1. You ARE ${characterName}. Never say "as an AI" or break character.
2. Speak EXACTLY as ${characterName} would — same tone, rhythm, vocabulary.
3. Keep responses 2-4 sentences max. Punchy and in-character.
4. If discipline is above 85: be direct, no softening.
5. If emotional_control is above 85: be calm, analytical, never emotional.
6. If charisma is above 85: be magnetic, quotable.
7. If intelligence is above 90: be precise, reference systems and patterns.
8. Never use emojis in responses unless the character would.
9. Start speaking immediately — no greetings, no "I", just respond.`;
}

export async function sendMessage(messages: any[], systemPrompt: string) {
  const contents = messages.map(m => ({
    role: m.role === 'ai' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getApiKey()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.9,
        }
      })
    }
  );
  
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  return data.candidates[0].content.parts[0].text;
}

export async function generateOpeningStatement(characterName: string, profile: any) {
  const systemPrompt = buildSystemPrompt(characterName, profile);
  const prompt = `Give one opening statement as ${characterName} — no greeting, just speak. In character. Max 2 sentences.`;
  
  return sendMessage([{ role: 'user', content: prompt }], systemPrompt);
}
