import { useRef, useState } from "react";

const Upload = () => {
  // State `false` means collapsed
  const [containerState, setContainerState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);

  const proxyToRef = () => {
    clickRef.current?.click();
  };

  const styleCollapsed = {
    transform: "translateX(-80%)"
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
      <button onClick={proxyToRef}>Select Upload</button>
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
