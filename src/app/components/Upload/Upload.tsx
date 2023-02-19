import { useRef, useState, FC } from "react";
import { Arrow } from "../Icons";
import "./Upload.css";
import { InputChange, UploadProps } from "../../Types";

const Upload: FC<any> = ({}) => {
  // STATE
  const [containerState, setContainerState] = useState(true);
  const [nameField, setNameField] = useState("");
  const [errorState, setErrorState] = useState("");
  // REF
  const clickRef = useRef<HTMLInputElement | null>(null);
  const proxyToRef = () => {
    clickRef.current?.click();
  };
  // STYLE STATES
  const transforms = Object.freeze({
    collapsed: {
      transform: "translateX(-71%)"
    },
    expanded: {
      transform: "translateX(0%)"
    },
    pointLeft: {
      transform: "rotate(-180deg)"
    },
    pointRight: {
      transform: "rotate(0deg)"
    }
  });
  const { collapsed, expanded, pointLeft, pointRight } = transforms;

  // EVENT HANDLERS
  const toggleTray = () => setContainerState((prev) => !prev);

  const handleFileNameChange = (e: InputChange) => setNameField(e.target.value);

  const handleFileInputChange = (_: InputChange) => {
    const suggested = clickRef.current!.files![0]["name"] || "";
    if (suggested) {
      setNameField(suggested.split(".")[0]);
    }
  };

  const DisplayError = (text: string) => {
    setErrorState(text);
    setTimeout(() => {
      setErrorState("");
    }, 3000);
  };

  return (
    <div className="upload-inputs">
      <div
        className="file-upload-container"
        style={containerState ? expanded : collapsed}
      >
        <input
          ref={clickRef}
          onChange={handleFileInputChange}
          accept=".csv"
          type="file"
        ></input>
        <button className="upload-btn" onClick={proxyToRef}>
          BROWSE
        </button>
        <button
          onClick={toggleTray}
          className="expander-btn"
          style={containerState ? pointLeft : pointRight}
        >
          {Arrow({})}
        </button>
      </div>
      <div
        className="file-submit"
        style={containerState ? expanded : { transform: "translateX(-69%)" }}
      >
        <input
          type="text"
          value={nameField}
          placeholder="classroom name"
          onChange={handleFileNameChange}
        />
        <button
        // onClick={(e) =>
        //   containerState
        //     ? handleFileSubmit()
        //     : toggleTray
        // }
        >
          {containerState ? "SUBMIT" : "UPLOAD"}
        </button>
      </div>
      {errorState && (
        <div style={{ marginTop: "9rem", position: "absolute", width: "15%" }}>
          {errorState}
        </div>
      )}
    </div>
  );
};

export default Upload;
