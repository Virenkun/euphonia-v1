"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Square, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSpeechToText } from "@/hooks/useSpeechToText";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { LLM_PROMPT, SESSIONS_ANALYSIS_PROMPT } from "@/constant/constants";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ForwardedAudioVisualizer } from "@/components/audio-visulizer";
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { getUserDetails, incrementSessions } from "@/services/users/action";
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
import EnhancedSessionSummaryModal from "@/components/SessionsSummary/session-summary-modal";
import { SessionData } from "@/components/SessionsSummary/type";
import { insertSession } from "@/services/chats/action";
import Link from "next/link";
import { AuroraText } from "@/components/ui/aurora-text";
import { MoodModal } from "@/components/SessionsSummary/mood-modal";

export default function ListeningInterface({
  limitReached,
  userName,
}: {
  limitReached: boolean;
  userName: string;
}) {
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
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSessionEnding, setIsSessionEnding] = useState(false);
  const [isMooodModalOpen, setIsMooodModalOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [isSpacebarHeld, setIsSpacebarHeld] = useState(false);
  const [sessionSummaryData, setSessionSummaryData] =
    useState<SessionData | null>(null);

  const audioRef = useRef<{
    stopAudio: () => void;
  }>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSessionActive) {
      setStartTime((prev) => prev ?? Date.now());

      timer = setInterval(() => {
        setSessionLength((prev) =>
          startTime ? Math.floor((Date.now() - startTime) / 1000) : prev
        );
      }, 1000);
    } else if (startTime) {
      const finalLength = Math.floor((Date.now() - startTime) / 1000);
      setSessionLength(finalLength);
      setStartTime(null);
    }

    return () => clearInterval(timer);
  }, [isSessionActive, startTime]);

  const handleMicClick = async () => {
    if (isListening) {
      // Stop recording
      setThinking(true);
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
          setThinking(true);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        isSessionActive &&
        !isListening &&
        !isAudioPlaying &&
        !isLoading &&
        !thinking &&
        event.code === "Space" &&
        !isSpacebarHeld
      ) {
        setIsSpacebarHeld(true);
        handleMicClick();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isSessionActive && event.code === "Space" && isSpacebarHeld) {
        setIsSpacebarHeld(false);
        handleMicClick(); // Stop recording
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpacebarHeld, isAudioPlaying, isListening, isSessionActive]);

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
    setDeleteSpeed(9999999);
    const { user } = await getUserDetails();
    setAssistantResponse("");
    setThinking(true);

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
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      const response = chatCompletion.choices[0]?.message?.content ?? "";

      const blob = await synthesizeSpeech(response);
      const { error: assistantError } = await supabase.from("messages").insert([
        {
          role: "assistant",
          content: response,
          session_id: sessionId,
          user_id: user.id,
        },
      ]);
      setThinking(false);
      if (assistantError) {
        console.error("Error saving assistant message:", assistantError);
      }
      if (blob) {
        setAudioBlob(blob);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const beginSession = async () => {
    setIsSessionActive(true);
    setIsLoading(true);
    const { user } = await getUserDetails();
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem("sessionId", newSessionId);

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
      }
    } else {
      console.error("Error fetching sessions:", error);
    }
    await incrementSessions();
  };

  const endSession = async () => {
    stopAudioHandler();
    setIsSessionEnding(true);
    const { user } = await getUserDetails();
    const chats = await fetchChatContext();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SESSIONS_ANALYSIS_PROMPT,
        },

        {
          role: "user",
          content: JSON.stringify(chats),
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });
    console.log(chats);
    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      console.log(JSON.parse(content));
      setSessionSummaryData(JSON.parse(content));
    } else {
      console.error("Content is null");
    }
    setIsSessionActive(false);
    setSessionId("");
    localStorage.removeItem("sessionId");
    setAssistantResponse("");
    await insertSession({
      id: sessionId,
      user_id: user.id,
      length: sessionLength,
    });
    const { error: session_summary_error } = await supabase
      .from("session_summary")
      .insert([
        {
          session_id: sessionId,
          summary: content ? JSON.parse(content) : null,
          user_id: user.id,
        },
      ]);
    if (session_summary_error) {
      console.error(
        "Error saving session summary:",
        session_summary_error.message
      );
    }

    setIsSessionEnding(false);
    setIsSessionModalOpen(true);
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

  const stopAudioHandler = () => {
    audioRef.current?.stopAudio();
  };

  return (
    <>
      <div className="min-h-[88vh]">
        <div className="flex min-h-[88vh] flex-col items-center justify-center p-4 gap-8 mx-auto flex-1">
          {!isSessionActive && (
            <div className="flex flex-col gap-2 items-center">
              <AuroraText className="text-4xl font-bold text-indigo-800 dark:text-white">
                Good {new Date().getHours() < 12 ? "Morning," : "Afternoon,"}{" "}
              </AuroraText>
              <AuroraText className="text-4xl font-bold text-indigo-800 dark:text-white">
                {userName}!
              </AuroraText>
            </div>
          )}
          <div className="text-neutral-800 text-lg font-medium h-6 mb-1">
            {isListening ? "euphonia listening to you..." : ""}
          </div>
          <ForwardedAudioVisualizer
            audioBlob={audioBlob}
            onPlayingChange={setIsAudioPlaying}
            ref={audioRef}
          />
          {thinking ? (
            <div>
              <div className="flex items-center gap-2 text-lg text-neutral-800">
                <span>euphonia is thinking</span>
                <div className="animate-bounce">...</div>
              </div>
            </div>
          ) : (
            <>
              {isSessionActive && !isLoading && (
                <div className="text-center text-neutral-800 dark:text-white text-lg font-medium whitespace-pre-line mt-4 w-1/3">
                  <Typewriter
                    options={{
                      strings: [assistantResponse],
                      autoStart: true,
                      delay: 42,
                      deleteSpeed: deleteSpeed,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {limitReached ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="text-center p-4 text-sm bg-red-100 border border-red-400 text-red-700 rounded">
                You have used all your Euphonia sessions. Please upgrade to
                continue your journey towards better mental health.
              </div>
              <Link href="/checkout">
                <RainbowButton>
                  Upgrade Now to continue talking to Euphonia
                </RainbowButton>
              </Link>
            </div>
          ) : (
            <>
              {!isSessionActive || isLoading ? (
                <RainbowButton onClick={beginSession} className="min-w-64 h-12">
                  {isLoading
                    ? "Preparing Your Session..."
                    : isSessionEnding
                    ? "Getting Session Summary..."
                    : "Begin Session"}
                </RainbowButton>
              ) : (
                <div className="flex gap-8 mt-16">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-16 h-16 rounded-full bg-neutral-100 hover:bg-neutral-200"
                  >
                    <Volume2 className="w-6 h-6 dark:text-black" />
                    <span className="sr-only">Toggle audio</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-16 h-16 rounded-full bg-[#9333ea] hover:bg-[#9333ea] dark:text-black"
                    onClick={handleMicClick}
                    disabled={isAudioPlaying || thinking}
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
                        <span className="sr-only ark:text-black">
                          End Session
                        </span>
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
                        <Button
                          variant="destructive"
                          onClick={endSession}
                          disabled={isSessionEnding}
                        >
                          {isSessionEnding ? "Ending..." : "End Session"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              {isSessionActive &&
                !thinking &&
                !isAudioPlaying &&
                !isLoading && (
                  <div className="text-neutral-600  font-medium h-6 my-6">
                    Press and hold{" "}
                    <kbd className="mx-1 px-3 py-1 text-xs font-semibold text-white bg-gray-800 border border-gray-900 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      Spacebar
                    </kbd>{" "}
                    to talk or click the mic button
                  </div>
                )}
            </>
          )}
        </div>
      </div>
      <EnhancedSessionSummaryModal
        isOpen={isSessionModalOpen}
        onClose={() => {
          setIsSessionModalOpen(false);
          setIsMooodModalOpen(true);
        }}
        data={sessionSummaryData}
      />
      <MoodModal isOpen={isMooodModalOpen} setIsOpen={setIsMooodModalOpen} />
    </>
  );
}
