interface TranscriptionResponse {
  text?: string;
}

export const UseSpeechToText = async (audioBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("model", "whisper-large-v3-turbo");
  formData.append("file", audioBlob, "audio.m4a"); // Attach the audio Blob as the file
  formData.append("response_format", "verbose_json");
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: formData, // Pass the formData
      }
    );

    if (!response.ok) {
      throw new Error("Transcription failed");
    }

    const result: TranscriptionResponse = await response.json();
    return result.text || "No transcription available";
    console.log(result.text || "No transcription available");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Transcription error: " + err.message);
    } else {
      console.error("Transcription error: " + String(err));
    }
    return "Transcription error";
  }
};
