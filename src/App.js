import { useRef, useState } from "react";
import DragAndDrop from "./component/DragAndDrop";
import "./styles.css";
import WaveForm from "./component/WaveForm";
import Infite from "./component/Infinite";

export default function App() {
  const [audioUrl, setAudioUrl] = useState();
  const [analyzerData, setAnalyzerData] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState(0.5);
  const audioElmRef = useRef(null);
  // console.log(color);
  const audioAnalyzer = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaElementSource(audioElmRef.current);
    source.connect(analyzer);
    source.connect(audioCtx.destination);
    source.onended = () => {
      source.disconnect();
    };

    setAnalyzerData({ analyzer, bufferLength, dataArray });
  };
  // Audio file access code
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;
    setAudioUrl(URL.createObjectURL(file));
    audioAnalyzer();
  };

  return (
    <div className="App">
      <h1 className="main-heading">WaveForm Visualizer</h1>
      <div className="second">
        {analyzerData && (
          <WaveForm analyzerData={analyzerData} color={color} size={size} />
        )}
        <div
          style={{
            height: 280,
            width: 800,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 4
          }}
        >
          {/* Drag and Drop Section */}
          <DragAndDrop
            onFileChange={onFileChange}
            setAudioUrl={setAudioUrl}
            audioAnalyzer={audioAnalyzer}
          />
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
          ></input>
          <input
            type="number"
            onChange={(e) => setSize(e.target.value)}
            placeholder="Change Wavefrom Size"
          />
          <audio src={audioUrl ?? ""} controls ref={audioElmRef} />
        </div>
      </div>
      {/*Infinite scroll section*/}
      <div className="first">
        <div className="scrollbox">
          <div className="scrollbox-inner">
            <Infite />
          </div>
        </div>
      </div>
    </div>
  );
}
