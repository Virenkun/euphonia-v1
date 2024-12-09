import { ElevenLabsClient } from "elevenlabs";

export const UseTextToSpeech = async (text: string) => {
  try {
    // Initialize the client with your API key
    const client = new ElevenLabsClient({
      apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    });

    // Convert text to speech
    const audioStream = await client.textToSpeech.convert(
      "21m00Tcm4TlvDq8ikWAM",
      {
        model_id: "eleven_multilingual_v2",
        text: text,
      }
    );

    // Convert stream to blob
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBlob = new Blob(chunks, { type: "audio/mpeg" });

    // Create and play audio
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);
    await audioElement.play();
  } catch (err) {
    console.error("Text-to-Speech Error:", err);
  }
};
