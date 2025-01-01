"use server";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const pollyClient = new PollyClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function synthesizeSpeech(
  text: string,
  voice: string = "Ruth",
  format: string = "mp3"
): Promise<Blob | undefined> {
  const CHUNK_SIZE = 16384; // 16KB chunks

  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: format as "mp3" | "ogg_vorbis" | "pcm",
    VoiceId: voice as "Ruth" | "Matthew" | "Ivy" | "Justin",
    Engine: "generative",
  });

  const response = await pollyClient.send(command);

  if (response.AudioStream) {
    const audioBuffer = await response.AudioStream.transformToByteArray();

    // Split into chunks
    const chunks = [];
    for (let i = 0; i < audioBuffer.length; i += CHUNK_SIZE) {
      const chunk = audioBuffer.slice(i, i + CHUNK_SIZE);
      chunks.push(new Blob([chunk], { type: `audio/${format}` }));
    }

    // Combine all chunks into final blob
    return new Blob(chunks, { type: `audio/${format}` });
  }

  return undefined;
}
