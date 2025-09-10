import type { ConversationRelayAttributes } from 'twilio/lib/twiml/VoiceResponse.js';

const goodTTS = {
  google: { journeyD: { ttsProvider: 'google', voice: 'en-US-Journey-D' } },
  elevenLabs: {
    jessicaAnne: { ttsProvider: 'ElevenLabs', voice: 'g6xIsTj2HwM6VR4iXFCw' }, // friendly and conversational female voice, motherly
    mark: { ttsProvider: 'ElevenLabs', voice: 'UgBBYS2sOqTuMpoF3BR0' }, // conversational, natural
    cassidy: { ttsProvider: 'ElevenLabs', voice: '56AoDkrOh6qfVPDXZ7Pt' }, //
    grandpaSpuds: { ttsProvider: 'ElevenLabs', voice: 'NOpBlnGInO9m6vDvFkFC' }, // humorous, disarming
    james: { ttsProvider: 'ElevenLabs', voice: 'EkK5I93UQWFDigLMpZcX' }, // husky, engaging
    ana: { ttsProvider: 'ElevenLabs', voice: 'rCmVtv8cYU60uhlsOo1M' }, // soft, british
    adamStone: { ttsProvider: 'ElevenLabs', voice: 'NFG5qt843uXKj4pFvR7C' }, // Adam Stone - late night radio
    theo: { ttsProvider: 'ElevenLabs', voice: 'NyxenPOqNyllHIzSoPbJ' }, // Theo - Smart, warm, open
    // Aussie from here down
    gemma: { ttsProvider: 'ElevenLabs', voice: '319bKIhetA5g6tmywrwj' }, // Gemma - Young Australian Female
    hanna: { ttsProvider: 'ElevenLabs', voice: 'M7ya1YbaeFaPXljg9BpK' }, // Hannah Jayne - Natural and neutral female Australian accent with a warm tone
    jess: { ttsProvider: 'ElevenLabs', voice: 'ys3XeJJA4ArWMhRpcX1D' }, // Jess - Relaxed, Conversational Australian female
    arabella: { ttsProvider: 'ElevenLabs', voice: 'aEO01A4wXwd1O8GPgGlF' }, // Arabella - A young engaging female voice, Australian female - best on multi-lingual v2
    sophia: { ttsProvider: 'ElevenLabs', voice: 'LtPsVjX1k0Kl4StEMZPK' }, // Sophia - Young Australian Female - A bright voice perfect for eLearning, narration and advertising.
    kylie: { ttsProvider: 'ElevenLabs', voice: 'e1nbKcfTL4XYy71tZn9J' }, // KYLIE - AUSTRALIAN FEMALE FRIENDLY WARM
    stuart: { ttsProvider: 'ElevenLabs', voice: 'HDA9tsk27wYi3uq0fPcK' }, // Stuart - Energetic and enthusiastic Australian
  },
};

export const relayConfig: Omit<ConversationRelayAttributes, 'url'> = {
  ...goodTTS.elevenLabs.stuart,
};
