import { useRef, useState } from "react";

const Upload = () => {
  // State `false` means collapsed
  const [containerState, setContainerState] = useState(true);

  const clickRef = useRef<HTMLInputElement | null>(null);
  const proxyToRef = () => {
    clickRef.current?.click();
  };

  const styleCollapsed = {
    transform: "translateX(-70%)"
  };
  const styleExpanded = {
    transform: "translateX(0%)"
  };
  const pointLeft = {
    transform: "rotate(-180deg)"
  };
  const pointRight = {
    transform: "rotate(0deg)"
  };

  const toggleTray = () => setContainerState((prev) => !prev);

  return (
    <div
      className="file-upload-container"
      style={containerState ? styleExpanded : styleCollapsed}
    >
      <input ref={clickRef} type="file"></input>
      <button className="upload-btn" onClick={proxyToRef}>
        Upload
      </button>
      <button
        onClick={toggleTray}
        className="expander-btn"
        style={containerState ? pointLeft : pointRight}
      >
        {">"}
      </button>
    </div>
  );
};

export default Upload;
