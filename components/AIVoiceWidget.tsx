'use client';
import { useState, useRef, useCallback } from 'react';

// --- Browser Speech Recognition (Chrome / Edge) ---
function getRecognition(): any {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// Read a streaming text/plain response fully, accumulating chunks.
async function readStreamText(res: Response): Promise<string> {
  if (res.body && typeof res.body.getReader === 'function') {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    result += decoder.decode();
    return result;
  }
  return res.text();
}

export default function AIVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Convert AI response to speech: prefer Gemini TTS via /api/tts,
  // fall back to the browser's built-in speechSynthesis.
  const speak = useCallback(async (text: string) => {
    const clean = text.replace(/[*#]/g, '').trim();
    if (!clean) {
      setStatus('idle');
      return;
    }
    setStatus('speaking');

    const playBrowser = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setStatus('idle');
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 1.0;
      u.pitch = 1.0;
      u.onstart = () => setStatus('speaking');
      u.onend = () => setStatus('idle');
      u.onerror = () => setStatus('idle');
      window.speechSynthesis.speak(u);
    };

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean }),
      });
      if (res.ok) {
        const blob = await res.blob();
        if (!audioRef.current) audioRef.current = new Audio();
        const audio = audioRef.current;
        audio.pause();
        audio.src = URL.createObjectURL(blob);
        audio.onended = () => setStatus('idle');
        audio.onerror = () => {
          setStatus('idle');
          playBrowser();
        };
        await audio.play();
        return;
      }
      playBrowser();
    } catch {
      playBrowser();
    }
  }, []);

  // Process input and get AI reply, then speak it back.
  const handleVoiceInput = useCallback(
    async (userText: string) => {
      setStatus('thinking');
      setError('');
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: userText }] }),
        });

        if (!res.ok) {
          let detail = `Request failed (${res.status})`;
          try {
            const j = await res.json();
            if (j?.error) detail = j.error;
          } catch {
            /* ignore non-JSON error body */
          }
          throw new Error(detail);
        }

        const text = (await readStreamText(res)).trim();
        setAiResponse(text.replace(/[*#]/g, ''));
        await speak(text.replace(/[*#]/g, ''));
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setStatus('idle');
      }
    },
    [speak]
  );

  // Listen to user voice. A NEW recognition instance is created on every
  // start so the widget keeps working after each session ends. Reusing one
  // instance throws InvalidStateError on the second start().
  const startListening = () => {
    setError('');

    if (status === 'speaking') {
      window.speechSynthesis?.cancel();
      audioRef.current?.pause();
    }
    if (status === 'listening') {
      recognitionRef.current?.stop();
      setStatus('idle');
      return;
    }

    const Recognition = getRecognition();
    if (!Recognition) {
      setError('Voice input isn\u2019t supported in this browser. Use Chrome or Edge.');
      setStatus('idle');
      return;
    }
    if (status === 'thinking') return;

    const rec = new Recognition();
    recognitionRef.current = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setTranscript('');
      setStatus('listening');
    };
    rec.onresult = (event: any) => {
      const text = event?.results?.[0]?.[0]?.transcript;
      if (text) {
        setTranscript(text);
        handleVoiceInput(text);
      } else {
        setStatus('idle');
      }
    };
    rec.onerror = (event: any) => {
      console.warn('Speech recognition error:', event?.error);
      if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') {
        setError('Microphone permission was denied. Enable it in your browser and try again.');
      }
      setStatus('idle');
    };
    rec.onend = () => {
      // If we weren't already processing a result, go back to idle.
      setStatus((s) => (s === 'thinking' || s === 'speaking' ? s : 'idle'));
    };

    try {
      rec.start();
    } catch (err) {
      console.error(err);
      setError('Could not start voice recognition.');
      setStatus('idle');
    }
  };

  return (
    <div className="fixed bottom-6 right-28 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          🎙️ Talk to Zameer&apos;s AI
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              audioRef.current?.pause();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
            aria-label="Close voice assistant"
          >
            ✕
          </button>

          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6">
            Voice Assistant
          </h3>

          {/* Animated Glowing Orb / Avatar */}
          <div className="relative flex items-center justify-center my-6">
            {status === 'listening' && (
              <div className="absolute w-36 h-36 rounded-full bg-emerald-500/30 animate-ping"></div>
            )}
            {status === 'speaking' && (
              <div className="absolute w-40 h-40 rounded-full bg-indigo-500/40 animate-pulse blur-md"></div>
            )}

            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center shadow-inner transition-all duration-500 ${
                status === 'idle'
                  ? 'bg-slate-800 border-2 border-slate-700'
                  : status === 'listening'
                    ? 'bg-emerald-600 scale-105 border-4 border-emerald-400'
                    : status === 'thinking'
                      ? 'bg-amber-600 animate-spin border-4 border-amber-400'
                      : 'bg-indigo-600 scale-110 border-4 border-indigo-400'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-all ${
                    status === 'speaking' ? 'animate-bounce' : ''
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-all ${
                    status === 'speaking' ? 'animate-bounce delay-100' : ''
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Status Label */}
          <p className="text-xs font-mono font-medium tracking-widest text-slate-400 my-2 uppercase">
            {status === 'idle' && 'Tap Mic to Speak'}
            {status === 'listening' && 'Listening...'}
            {status === 'thinking' && 'Thinking...'}
            {status === 'speaking' && 'Speaking...'}
          </p>

          {/* Error message */}
          {error && <p className="text-xs text-red-400 mb-1 text-center">{error}</p>}

          {/* Captions / Transcript Display */}
          <div className="w-full bg-slate-800/60 p-3 rounded-xl min-h-[60px] max-h-[100px] overflow-y-auto text-xs text-slate-300 text-center my-3 border border-slate-700/50">
            {status === 'listening' && (
              <p className="italic text-emerald-400">
                &quot;{transcript || 'Listening to your voice...'}&quot;
              </p>
            )}
            {status === 'thinking' && <p className="text-amber-400 animate-pulse">Getting response...</p>}
            {status === 'speaking' && <p className="text-indigo-300">{aiResponse}</p>}
            {status === 'idle' && (
              <p className="text-slate-500 italic">
                &quot;Ask me about Zameer&apos;s React experience!&quot;
              </p>
            )}
          </div>

          {/* Controls */}
          <button
            onClick={startListening}
            disabled={status === 'thinking'}
            className={`w-full py-3 rounded-2xl font-medium transition flex items-center justify-center gap-2 ${
              status === 'listening'
                ? 'bg-emerald-500 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {status === 'listening' ? '🎤 Listening... (tap to stop)' : '🎤 Tap to Speak'}
          </button>
        </div>
      )}
    </div>
  );
}
