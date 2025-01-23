import { useEffect, useRef } from 'react';

interface AudioMeterProps {
  mediaRecorder: MediaRecorder | null;
  isRecording: boolean;
}

export function AudioMeter({ mediaRecorder, isRecording }: AudioMeterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();

  useEffect(() => {
    if (!isRecording || !mediaRecorder || !canvasRef.current) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 32; // Reduzido para um visual mais simples

    const source = audioContext.createMediaStreamSource(mediaRecorder.stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d')!;

    function draw() {
      if (!isRecording) return;

      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(20, 20, 20)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculando a média das frequências para uma única barra
      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      const barHeight = (average / 255) * canvas.height;

      // Desenhando uma única barra que pulsa
      canvasCtx.fillStyle = `rgb(99, 102, 241)`;
      canvasCtx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
    }

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioContext.close();
    };
  }, [isRecording, mediaRecorder]);

  return (
    <canvas
      ref={canvasRef}
      width={4}
      height={20}
      className="rounded-sm bg-black/5"
    />
  );
}