export const UseTextToSpeechDeepgram = async (text: string) => {
  try {
    const deepgramApiKey = "758427543213d5c9eb9df539937910bf78940fed"; // Replace with your actual Deepgram API key

    // Making a POST request to Deepgram's API with the provided text
    const response = await fetch(
      "https://api.deepgram.com/v1/speak?model=aura-athena-en",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${deepgramApiKey}`,
          "Content-Type": "text/plain",
        },
        body: text,
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch audio from Deepgram");
    }

    // The API returns audio data directly, we can now create an audio blob from the response
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Create an audio element and play the audio
    const audioElement = new Audio(audioUrl);
    await audioElement.play();
  } catch (err) {
    console.error("Text-to-Speech Error:", err);
  }
};
