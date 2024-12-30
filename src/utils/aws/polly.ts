"use server";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

// Initialize Polly client
const pollyClient = new PollyClient({
  region: "us-east-1", // Replace with your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Function to synthesize speech and return a Blob
export async function synthesizeSpeech(
  text: string,
  voice: string = "Ruth",
  format: string = "mp3"
): Promise<Blob | undefined> {
  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: format as "mp3" | "ogg_vorbis" | "pcm",
    VoiceId: voice as "Ruth" | "Matthew" | "Ivy" | "Justin",
    Engine: "generative",
  });

  const response = await pollyClient.send(command);

  if (response.AudioStream) {
    // Convert the Node.js stream (Buffer) to a Blob
    const audioBuffer = await response.AudioStream.transformToByteArray();
    return new Blob([audioBuffer], { type: `audio/${format}` });
  }

  return undefined;
}

// Helper function: Convert Node.js readable stream to buffer
// Removed streamToBuffer function as it's no longer needed
