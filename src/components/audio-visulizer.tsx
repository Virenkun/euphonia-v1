import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

interface AudioVisualizerProps {
  audioBlob: Blob | null;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const AudioVisualizer = (
  { audioBlob, onPlayingChange }: AudioVisualizerProps,
  ref: React.Ref<{
    stopAudio: () => void;
  }>
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioContextClosed, setIsAudioContextClosed] = useState(false);

  useImperativeHandle(ref, () => ({
    stopAudio: () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContext && !isAudioContextClosed) {
        audioContext.close();
        setIsAudioContextClosed(true);
      }
      setIsPlaying(false);
      onPlayingChange?.(false);
    },
  }));

  useEffect(() => {
    const setupAudio = async () => {
      if (audioBlob) {
        try {
          const context = new AudioContext();
          setIsAudioContextClosed(false);
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
          console.error("Error setting up audio:", error);
        }
      } else {
        setIsPlaying(false);
      }
    };

    setupAudio();

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
      if (audioContext && !isAudioContextClosed) {
        audioContext.close();
        setIsAudioContextClosed(true);
      }
      setIsPlaying(false);
      onPlayingChange?.(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob, onPlayingChange]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dataArray = new Uint8Array(analyser?.frequencyBinCount || 0);
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying && analyser) {
        // Visualize actual audio data
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const radius = 100 + (average / 256) * 50;

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#5b21b6";
        ctx.fill();
      } else {
        // Pulsating circle effect
        const baseRadius = 100;
        const pulsateAmplitude = 3;
        const radius = baseRadius + pulsateAmplitude * Math.sin(time * 0.05); // Smooth "breathing" effect
        time++;

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
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

export const ForwardedAudioVisualizer = React.forwardRef(AudioVisualizer);
