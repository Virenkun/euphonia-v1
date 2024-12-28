import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  audioBlob: Blob | null;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const AudioVisualizer = ({
  audioBlob,
  onPlayingChange,
}: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioBlob) return;

    const setupAudio = async () => {
      try {
        const context = new AudioContext();
        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 256;

        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);

        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        sourceRef.current = source;

        source.connect(analyserNode);
        analyserNode.connect(context.destination);

        source.start();
        setIsPlaying(true);
        onPlayingChange?.(true);

        source.onended = () => {
          setIsPlaying(false);
          onPlayingChange?.(false);
        };

        setAudioContext(context);
        setAnalyser(analyserNode);
      } catch (error) {
        console.error("Error processing audio blob:", error);
      }
    };

    setupAudio();

    return () => {
      sourceRef.current?.stop();
      audioContext?.close();
      setIsPlaying(false);
      onPlayingChange?.(false);
    };
  }, [audioBlob, onPlayingChange]);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const radius = 100 + (average / 256) * 50;

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#5b21b6";
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
        ctx.fillStyle = "#5b21b6";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, isPlaying]);

  return (
    <div className="pointer-events-none">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};
