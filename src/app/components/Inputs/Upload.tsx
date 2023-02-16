import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Arrow } from "../Icons";
import { API } from "../../api";
import { fileToString } from "../../utils/parse";

const Upload = ({
  setStudentData,
  setFileOptions
}: {
  setStudentData: any;
  setFileOptions: any;
}) => {
  // STATE
  const [containerState, setContainerState] = useState(true);
  const [nameField, setNameField] = useState("");
  const [errorState, setErrorState] = useState("");
  const [buttonTxt, setButtonTxt] = useState("Upload");
  // REF
  const clickRef = useRef<HTMLInputElement | null>(null);
  const proxyToRef = () => {
    clickRef.current?.click();
  };
  // STYLE STATES
  const transforms = Object.freeze({
    collapsed: {
      transform: "translateX(-66%)"
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

  const handleMouseEnter = (_: MouseEvent<HTMLButtonElement>) =>
    setButtonTxt("Browse");

  const handleMouseLeave = (_: MouseEvent<HTMLButtonElement>) =>
    setButtonTxt("Upload");

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNameField(e.target.value);

  const handleFileInputChange = (_: ChangeEvent<HTMLInputElement>) => {
    const suggested = clickRef.current!.files![0]["name"] || "";
    if (suggested) {
      setNameField(suggested.split(".")[0]);
    }
  };

  const handleFileSubmit = async (_: MouseEvent<HTMLButtonElement>) => {
    if (!clickRef.current) {
      DisplayError("You must select a file to upload.");
      return;
    }
    if (nameField.length < 3) {
      DisplayError("The name for your file must be at least 3 characters long");
      return;
    }
    if (clickRef.current) {
      const file = clickRef.current.files![0];
      const jsonString = await fileToString(file);
      const res = await API.uploadObject(jsonString, nameField);
      const data = JSON.parse(res);
      setStudentData(data);
      const filenames = await API.listObjects();
      setFileOptions(filenames);
      setNameField("");
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
        <button
          className="upload-btn"
          onClick={proxyToRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {buttonTxt}
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
        style={containerState ? expanded : { transform: "translateX(-71%)" }}
      >
        <input
          type="text"
          value={nameField}
          placeholder="classroom name"
          onChange={handleFileNameChange}
        />
        <button onClick={containerState ? handleFileSubmit : toggleTray}>
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
