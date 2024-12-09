import { ElevenLabsClient } from "elevenlabs";

export const UseTextToSpeechStream = async (text: string) => {
  try {
    const client = new ElevenLabsClient({
      apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    });

    // Initialize AudioContext
    const audioContext = new AudioContext();
    const audioChunks: ArrayBuffer[] = [];

    // Fetch the audio stream
    const audioStream = await client.textToSpeech.convertAsStream(
      "21m00Tcm4TlvDq8ikWAM",
      {
        text,
        model_id: "eleven_multilingual_v2",
      }
    );

    for await (const chunk of audioStream) {
      // Ensure chunk is in ArrayBuffer format
      const chunkArrayBuffer =
        chunk instanceof ArrayBuffer ? chunk : chunk.buffer;
      audioChunks.push(chunkArrayBuffer);
    }

    // Combine audio chunks into a single ArrayBuffer
    const combinedAudio = audioChunks.reduce((acc, chunk) => {
      const temp = new Uint8Array(acc.byteLength + chunk.byteLength);
      temp.set(new Uint8Array(acc), 0);
      temp.set(new Uint8Array(chunk), acc.byteLength);
      return temp.buffer;
    }, new ArrayBuffer(0));

    // Decode and play the combined audio
    const decodedAudio = await audioContext.decodeAudioData(combinedAudio);
    const source = audioContext.createBufferSource();
    source.buffer = decodedAudio;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("Streaming Error:", error);
  }
};
