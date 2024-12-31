"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Square, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSpeechToText } from "@/hooks/useSpeechToText";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { LLM_PROMPT } from "@/constant/constants";
// import { UseTextToSpeechDeepgram } from "@/hooks/UseTextToSpeechDeepgram";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { AudioVisualizer } from "@/components/audio-visulizer";
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { getUserDetails } from "@/services/users/action";
import Typewriter from "typewriter-effect";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { groq } from "@/utils/groq/client";
import { synthesizeSpeech } from "@/utils/aws/polly";

export default function ListeningInterface() {
  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [sessionLength, setSessionLength] = useState<number>(0);
  const [deleteSpeed, setDeleteSpeed] = useState<number>(99999);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSessionActive) {
      setStartTime((prev) => prev || Date.now());

      timer = setInterval(() => {
        setSessionLength((prev) =>
          startTime ? Math.floor((Date.now() - startTime) / 1000) : prev
        );
      }, 1000);
    } else {
      if (startTime) {
        const finalLength = Math.floor((Date.now() - startTime) / 1000);
        setSessionLength(finalLength);
        setStartTime(null);
      }
    }

    return () => clearInterval(timer);
  }, [isSessionActive, startTime]);

  useEffect(() => {
    // Check if localStorage is available
    const storedSessionId = localStorage.getItem("sessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  useAsyncEffect(async () => {
    setIsLoading(true);
    if (isSessionActive) {
      const blob = await synthesizeSpeech(
        "hmm Welcome, it’s good to have you here. This is your space to share, reflect, and be heard. Take a deep breath, and when you’re ready, umm let’s talk about how you’re feeling today."
      );
      if (blob) {
        setTimeout(() => {
          setAudioBlob(blob);
          setAssistantResponse(
            "Welcome, it’s good to have you here. This is your space to share, reflect, and be heard. Take a deep breath, and when you’re ready, let’s talk about how you’re feeling today"
          );
        });
      }
    }
    setIsLoading(false);
  }, [isSessionActive]);

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
          setDeleteSpeed(50);
          setAssistantResponse("");
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
    setDeleteSpeed(99999);
    const { user } = await getUserDetails();
    setAssistantResponse("");

    // Save user input to Supabase
    const { error: userError } = await supabase.from("messages").insert([
      {
        role: "user",
        content: userInput,
        session_id: sessionId,
        user_id: user.id,
      },
    ]);

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
          user_id: user.id,
        },
      ]);

      if (assistantError) {
        console.error("Error saving assistant message:", assistantError);
      }

      // const blob = await UseTextToSpeechDeepgram(response);
      const blob = await synthesizeSpeech(response);
      if (blob) {
        setAudioBlob(blob);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const beginSession = async () => {
    setIsLoading(true);
    const { user } = await getUserDetails();
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem("sessionId", newSessionId);
    setIsSessionActive(true);
    const { data, error } = await supabase
      .from("user_info")
      .select("sessions")
      .eq("email", user?.email)
      .single();

    if (data) {
      const updatedSessions = [...(data.sessions || []), newSessionId];

      const { error: updateError } = await supabase
        .from("user_info")
        .update({
          sessions: updatedSessions,
        })
        .eq("email", user?.email);

      if (updateError) {
        console.error("Error updating sessions:", updateError);
      } else {
      }
    } else {
      console.error("Error fetching sessions:", error);
    }
  };

  const endSession = async () => {
    setIsLoading(true);
    const { user } = await getUserDetails();
    setIsSessionActive(false);
    setSessionId("");
    localStorage.removeItem("sessionId");
    setAssistantResponse("");
    const { error } = await supabase.from("session").insert([
      {
        id: sessionId,
        user_id: user.id,
        length: sessionLength,
      },
    ]);
    if (error) {
      console.error("Error saving session:", error.message);
    }
    setIsLoading(false);
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

  return (
    <div className="min-h-[88vh]">
      <div className="flex min-h-[88vh] flex-col items-center justify-center p-4 gap-8 mx-auto flex-1">
        <>
          <div className="text-neutral-800 text-lg h-6 mb-10">
            {isListening ? "listening..." : ""}
          </div>
          <AudioVisualizer
            audioBlob={audioBlob}
            onPlayingChange={setIsAudioPlaying}
          />
          {isSessionActive && !isLoading && (
            <div className="text-center text-neutral-800 dark:text-white text-lg font-medium whitespace-pre-line mt-4 w-1/3">
              <Typewriter
                options={{
                  strings: [assistantResponse],
                  autoStart: true,
                  delay: 50,
                  deleteSpeed: deleteSpeed,
                }}
              />
            </div>
          )}

          {!isSessionActive || isLoading ? (
            <RainbowButton onClick={beginSession}>
              {isLoading ? "Settings Things..." : "Begin Session"}
            </RainbowButton>
          ) : (
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
                disabled={isAudioPlaying}
              >
                {isListening ? (
                  <Square className="w-8 h-8 text-white dark:text-black" />
                ) : (
                  <Mic className="w-8 h-8 text-white dark:text-black" />
                )}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:text-black"
                  >
                    <X className="w-6 h-6 dark:text-black" />
                    <span className="sr-only ark:text-black">End Session</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>End the Session</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to end the session?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" onClick={endSession}>
                      {isLoading ? "Ending..." : "End Session"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
