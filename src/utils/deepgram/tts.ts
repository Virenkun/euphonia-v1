"use server";

export async function synthesizeSpeech(
  text: string,
  model: string = "aura-2-delia-en",
  format: string = "mp3"
): Promise<Blob | undefined> {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  try {
    const response = await fetch(
      `https://api.deepgram.com/v1/speak?model=${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "text/plain",
        },
        body: text,
      }
    );

    if (!response.ok || !response.body) {
      console.error("Deepgram TTS failed:", await response.text());
      return;
    }

    // Collect the streamed audio response
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    return new Blob(chunks, { type: `audio/${format}` });
  } catch (err) {
    console.error("TTS Error:", err);
    return;
  }
}
