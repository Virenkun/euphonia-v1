import React, { useRef, useEffect } from "react";

const MicrophoneVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create an analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 32; // Determines the number of data points
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      visualize();
    };

    const visualize = () => {
      if (!canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      const analyser = analyserRef.current;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set styles
        const barWidth = canvas.width / dataArray.length;
        let barHeight;
        let x = 0;

        dataArray.forEach((value) => {
          barHeight = value / 2;

          // Set color
          ctx.fillStyle = `rgb(${value + 100}, 50, 150)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth;
        });

        animationFrameRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    setupAudio();

    return () => {
      // Clean up on unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={300} height={100} />;
};

export default MicrophoneVisualizer;
