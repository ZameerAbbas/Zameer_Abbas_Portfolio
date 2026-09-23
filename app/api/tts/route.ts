import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Gemini TTS model + voice. Swap GEMINI_TTS_VOICE for any of:
// Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Callirrhoe,
// Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome,
// Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux,
// Pulcherrima, Achird, Zubenelgenubi, Vindemiatrix, Sadachbia,
// Sadaltager, Sulafat
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const TTS_VOICE = process.env.GEMINI_TTS_VOICE || 'Kore';
const MAX_CHARS = 1500;

/**
 * Wrap raw PCM (24kHz, 16-bit, mono) from Gemini TTS into a WAV container
 * so browsers can play it directly as an audio blob.
 */
function pcmToWav(pcm: Buffer): Buffer {
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);

  return Buffer.concat([header, pcm]);
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GOOGLE_GENERATIVE_AI_API_KEY is not set. Add it to your .env.local file.',
      },
      { status: 500 }
    );
  }

  let text: unknown;
  try {
    ({ text } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (typeof text !== 'string' || text.trim().length === 0) {
    return NextResponse.json(
      { error: 'A non-empty "text" string is required.' },
      { status: 400 }
    );
  }

  // Strip markdown/emoji noise so the voice doesn't read symbols aloud.
  const clean = text
    .slice(0, MAX_CHARS)
    .replace(/[*_`#>]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim();

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: clean }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: TTS_VOICE },
              },
            },
          },
        }),
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('[api/tts] Gemini error', upstream.status, detail);
      return NextResponse.json(
        { error: `TTS upstream failed (${upstream.status}).` },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const part = data?.candidates?.[0]?.content?.parts?.find(
      (p: { inlineData?: { data?: string } }) => p?.inlineData?.data
    );

    if (!part?.inlineData?.data) {
      console.error('[api/tts] No audio in response', JSON.stringify(data));
      return NextResponse.json(
        { error: 'TTS returned no audio.' },
        { status: 502 }
      );
    }

    const pcm = Buffer.from(part.inlineData.data, 'base64');
    const wav = pcmToWav(pcm);

    return new Response(new Uint8Array(wav), {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': String(wav.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[api/tts] Unexpected error', err);
    return NextResponse.json(
      { error: 'Unexpected error generating speech.' },
      { status: 500 }
    );
  }
}
