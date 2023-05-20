import React, { useRef } from "react";
import "../styles.css";
const DragAndDrop = ({ onFileChange, setAudioUrl, audioAnalyzer }) => {
  const inputRef = useRef();
  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAudioUrl(URL.createObjectURL(file));
    audioAnalyzer();
  };
  return (
    <>
      {
        <div className="dropzone" onDragOver={handleDrag} onDrop={handleDrop}>
          <h3>Drag and Drop Files</h3>
          <h3>Or</h3>
          <input
            type="file"
            hidden
            onChange={(e) => onFileChange(e)}
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select</button>
        </div>
      }
    </>
  );
};

export default DragAndDrop;
