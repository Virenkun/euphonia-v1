"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Square, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSpeechToText } from "@/hooks/useSpeechToText";
import { Groq } from "groq-sdk";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { LLM_PROMPT } from "@/constant/constants";
import { UseTextToSpeechDeepgram } from "@/hooks/UseTextToSpeechDeepgram";
import { RainbowButton } from "@/components/ui/rainbow-button";

const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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", // Update your GROQ API key here
  dangerouslyAllowBrowser: true,
});

export default function ListeningInterface() {
  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>(
    localStorage.getItem("sessionId") || uuidv4()
  );
  const [isSessionActive, setIsSessionActive] = useState(false);

  const [displayedResponse, setDisplayedResponse] = useState<string>("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  const handleMicClick = async () => {
    if (isListening) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsListening(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        // Handle data available event
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        // Handle stop event
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          chunksRef.current = [];
          const transcription = await UseSpeechToText(audioBlob);
          await fetchChatResponse(transcription || "");
        };

        mediaRecorder.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const fetchChatContext = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching chat context:", error);
      return [];
    }
    return data.map((message) => ({
      role: message.role,
      content: message.content,
    }));
  };

  const fetchChatResponse = async (userInput: string) => {
    setAssistantResponse("");

    // Save user input to Supabase
    const { error: userError } = await supabase
      .from("messages")
      .insert([{ role: "user", content: userInput, session_id: sessionId }]);

    if (userError) {
      console.error("Error saving user message:", userError);
      return;
    }

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: LLM_PROMPT,
          },
          ...(await fetchChatContext()),
          {
            role: "user",
            content: userInput,
          },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      const response = chatCompletion.choices[0]?.message?.content || "";

      const { error: assistantError } = await supabase.from("messages").insert([
        {
          role: "assistant",
          content: response,
          session_id: sessionId,
        },
      ]);

      if (assistantError) {
        console.error("Error saving assistant message:", assistantError);
      }

      UseTextToSpeechDeepgram(response);
    } catch (error) {
      console.error("Error fetching response from Groq:", error);
    }
  };

  const beginSession = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem("sessionId", newSessionId);
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSessionId("");
    localStorage.removeItem("sessionId");
    setAssistantResponse("");
    setDisplayedResponse("");
  };

  useEffect(() => {
    if (isSessionActive) {
      const subscription = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {
            const newMessage = payload.new;
            if (newMessage.role === "assistant") {
              setAssistantResponse((prev) => prev + newMessage.content);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, isSessionActive]);

  const typeResponse = (response: string) => {
    let index = 0;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setDisplayedResponse(""); // Ensure displayedResponse starts fresh

    typingIntervalRef.current = setInterval(() => {
      setDisplayedResponse((prev) => prev + response[index]);
      index++;

      if (index >= response.length - 1) {
        clearInterval(typingIntervalRef.current!);
        typingIntervalRef.current = null;
      }
    }, 50); // Typing speed in milliseconds
  };

  useEffect(() => {
    if (assistantResponse) {
      typeResponse(assistantResponse);
    }
  }, [assistantResponse]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 mx-auto flex-1">
      {!isSessionActive ? (
        <RainbowButton onClick={beginSession}>Begin Session</RainbowButton>
      ) : (
        <>
          <div className="text-neutral-800 text-lg h-6 mb-10">
            {isListening ? "listening..." : ""}
          </div>

          <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 animate-spin blur-sm shadow-[0px_-5px_20px_0px_rgb(186,66,255),0px_5px_20px_0px_rgb(0,225,255)]">
            <div className="absolute inset-0 bg-gray-900 rounded-full blur-xl"></div>
          </div>

          <div className="text-center text-neutral-800 dark:text-white text-lg font-medium whitespace-pre-line mt-4">
            {displayedResponse || "Assistant's response will appear here..."}
          </div>

          <div className="flex gap-8 mt-16">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200"
              onClick={() => console.log("Toggle audio")}
            >
              <Volume2 className="w-6 h-6 dark:text-black" />
              <span className="sr-only">Toggle audio</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-[#9333ea] hover:bg-[#9333ea] dark:text-black"
              onClick={handleMicClick}
            >
              {isListening ? (
                <Square className="w-8 h-8 text-white dark:text-black" />
              ) : (
                <Mic className="w-8 h-8 text-white dark:text-black" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:text-black"
              onClick={endSession}
            >
              <X className="w-6 h-6 dark:text-black" />
              <span className="sr-only ark:text-black">End Session</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
