import { useRef, useEffect } from "react";
import useSize from "./useSize";

function animateBars(
  analyser,
  canvas,
  canvasCtx,
  dataArray,
  bufferLength,
  color,
  size
) {
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = "#000";

  const HEIGHT = canvas.height / 1.6;

  var barWidth = Math.ceil(canvas.width / bufferLength) * size;
  let barHeight;
  let x = 0;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * HEIGHT;
    const userColor = color;
    canvasCtx.fillStyle = userColor;
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const WaveForm = ({ analyzerData, color, size }) => {
  const canvasRef = useRef(null);
  const { dataArray, analyzer, bufferLength } = analyzerData;
  const [width, height] = useSize();

  const draw = (dataArray, analyzer, bufferLength) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    const animate = () => {
      requestAnimationFrame(animate);
      canvas.width = canvas.width;
      canvasCtx.translate(0, canvas.offsetHeight / 2 - 115);
      animateBars(
        analyzer,
        canvas,
        canvasCtx,
        dataArray,
        bufferLength,
        color,
        size
      );
    };

    animate();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
  }, [dataArray, analyzer, bufferLength, color, size]);

  return (
    <canvas
      style={{
        position: "absolute",
        top: "140",
        left: "0",
        zIndex: "-10"
      }}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default WaveForm;
