'use client';
import { useRef, useState } from 'react';

type Msg = { id: string; role: 'user' | 'assistant'; content: string };

// --- Browser Speech Recognition (Chrome / Edge) ---
function getRecognition(): any {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(true);
  const [audioSaying, setAudioSaying] = useState(false);
  const mediaRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const playAudio = (blobUrl: string) => {
    if (!mediaRef.current) {
      mediaRef.current = new Audio();
    }
    const audio = mediaRef.current;
    audio.pause();
    audio.src = blobUrl;
    setAudioSaying(true);
    audio.onended = () => setAudioSaying(false);
    audio.onerror = () => setAudioSaying(false);
    audio.play().catch(() => setAudioSaying(false));
  };

  const playBrowserTTS = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    u.onend = () => setAudioSaying(false);
    u.onerror = () => setAudioSaying(false);
    setAudioSaying(true);
    window.speechSynthesis.speak(u);
  };

  // Speak the assistant reply: prefer Gemini TTS via /api/tts, fall back to browser TTS.
  const speakReply = async (text: string) => {
    if (!voiceReplies) return;
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        playAudio(url);
        return;
      }
      playBrowserTTS(text);
    } catch {
      playBrowserTTS(text);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error ?? `Request failed (${res.status})`);
      }

      const textContent = await res.text();
      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: textContent,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      void speakReply(textContent);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `⚠️ Something went wrong: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    const Recognition = getRecognition();
    if (!Recognition) {
      alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const rec = new Recognition();
    recognitionRef.current = rec;
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onerror = (event: any) => {
      console.warn('Speech recognition error:', event?.error);
      setIsListening(false);
    };
    rec.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      if (transcript) setInput(transcript);
    };

    rec.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#000000] text-white px-5 py-3 rounded-full shadow-xl hover:bg-[#151518] transition-all font-medium flex items-center gap-2"
        >
          <span>Ask Zameer&apos;s AI</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#000000] text-white p-4 flex justify-between items-center">
            <span className="font-semibold text-sm">Zameer&apos;s AI Assistant</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                <input
                  type="checkbox"
                  checked={voiceReplies}
                  onChange={(e) => setVoiceReplies(e.target.checked)}
                  className="accent-white"
                />
                Voice
              </label>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.length === 0 && (
              <p className="text-gray-500 text-xs italic bg-gray-50 p-3 rounded-lg border">
                👋 Hi! I am Zameer&apos;s AI assistant. Ask me anything about his React/Next.js
                experience, tech stack, or projects!
                 Use the 🎤 button to talk.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#000000] text-white ml-auto rounded-br-none'
                    : 'bg-gray-100 text-gray-800 mr-auto rounded-bl-none'
                }`}
              >
                {m.role === 'assistant' && audioSaying && (
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-blue-600">🔊</span>
                    <span className="text-[10px] text-blue-600">
                      {isLoading ? 'typing…' : 'speaking…'}
                    </span>
                  </div>
                )}
                {m.content}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="bg-gray-100 text-gray-500 mr-auto p-3 rounded-xl max-w-[85%] text-xs rounded-bl-none">
                <span className="italic">Zameer&apos;s AI is typing…</span>
              </div>
            )}
          </div>

          {/* Input + mic */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-gray-50 flex gap-2 items-center">
            <button
              type="button"
              onClick={startListening}
              title="Speak your question (Chrome/Edge)"
              className={`px-3 py-2 rounded-xl text-sm transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              🎤
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening…' : 'Ask a question…'}
              className="flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || isListening}
              className="bg-[#000000] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#151518] disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
