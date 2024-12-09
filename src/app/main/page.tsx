"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Square, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSpeechToText } from "@/hooks/useSpeechToText";
import { Groq } from "groq-sdk";
import { UseTextToSpeechStream } from "@/hooks/UseTextToSpeechStream";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { LLM_PROMPT } from "@/constant/constants";
import { UseTextToSpeechDeepgram } from "@/hooks/UseTextToSpeechDeepgram";

const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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", // Update your GROQ API key here
  dangerouslyAllowBrowser: true,
});

export default function ListeningInterface() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState<string | null>("");
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState<string>(
    localStorage.getItem("sessionId") || uuidv4()
  );

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
          setText(transcription || "No transcription available");
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
    setAssistantResponse(""); // Clear previous response

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
        stream: true,
      });

      let response = "";

      for await (const chunk of chatCompletion) {
        const chunkContent = chunk.choices[0]?.delta?.content || "";
        setAssistantResponse((prev) => prev + chunkContent);
        response += chunkContent;
      }

      // Save assistant response to Supabase
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

  useEffect(() => {
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
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    const loadMessages = async () => {
      const context = await fetchChatContext();
      setMessages(context);
    };

    loadMessages();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 max-w-2xl mx-auto">
      {/* Listening status */}
      <div className="text-neutral-800 text-lg h-6 mb-10">
        {isListening ? "listening..." : ""}
      </div>

      {/* Yellow circle */}
      <div
        className={`w-48 h-48 rounded-full bg-[#9333ea] mb-8 ${
          isListening && "animate-pulse-shadow"
        }`}
      />

      {/* Message */}
      <div className="text-center text-neutral-800 text-lg whitespace-pre-line">
        {text || "Start speaking to see the transcription here..."}
      </div>

      {/* Assistant Response */}
      <div className="mt-4 text-neutral-800 text-lg whitespace-pre-line">
        {assistantResponse || "Assistant's response will appear here..."}
      </div>

      {/* Chat History */}
      <div className="chat-box mt-6 w-full p-4 bg-neutral-100 rounded-lg">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message mb-4 ${
              msg.role === "assistant" ? "text-blue-600" : "text-black"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-8 mt-16">
        <Button
          variant="ghost"
          size="icon"
          className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200"
          onClick={() => console.log("Toggle audio")}
        >
          <Volume2 className="w-6 h-6" />
          <span className="sr-only">Toggle audio</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-16 h-16 rounded-full bg-[#9333ea] hover:bg-[#9333ea]"
          onClick={handleMicClick}
        >
          {isListening ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200"
          onClick={() => console.log("Close")}
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
