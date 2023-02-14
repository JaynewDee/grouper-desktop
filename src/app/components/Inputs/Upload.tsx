import { useRef, useState } from "react";
import { Arrow } from "../Icons";
import { API } from "../../api";
import { fileToString } from "../../utils/parse";

const Upload = ({ setStudentData }: { setStudentData: any }) => {
  const [containerState, setContainerState] = useState(true);
  const [nameField, setNameField] = useState("");
  const [errorState, setErrorState] = useState("");
  const [buttonTxt, setButtonTxt] = useState("Upload");
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

  const handleFileNameChange = (e: any) => setNameField(e.target.value);

  const handleFileInputChange = (e: any) => {
    const suggested = clickRef.current!.files![0]["name"];
    if (suggested) {
      setNameField(suggested.split(".")[0]);
    }
  };

  const handleFileSubmit = async (e: any) => {
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
      setNameField("");
    }
  };

  const DisplayError = (text: string) => {
    setErrorState(text);
    setTimeout(() => {
      setErrorState("");
    }, 3000);
  };

  const handleMouseEnter = (e: any) => {
    setButtonTxt("Browse");
  };
  const handleMouseLeave = (e: any) => {
    setButtonTxt("Upload");
  };

  return (
    <div className="upload-inputs">
      <div
        className="file-upload-container"
        style={containerState ? styleExpanded : styleCollapsed}
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
        style={containerState ? styleExpanded : styleCollapsed}
      >
        <input type="text" value={nameField} onChange={handleFileNameChange} />
        <button onClick={handleFileSubmit}>SUBMIT</button>
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
