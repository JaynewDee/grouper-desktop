import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
  FC
} from "react";
import { Arrow } from "../Icons";
import { API } from "../../api";
import { fileToString } from "../../utils/parse";
import "./Upload.css";
import { SetStudentState } from "../StudentView";

type SetFiles = Dispatch<SetStateAction<string[] | []>>;

type InputChange = ChangeEvent<HTMLInputElement>;

interface UploadProps {
  setStudentData: SetStudentState;
  setAvailableFiles: SetFiles;
  isLoggedIn: boolean;
}

const Upload: FC<UploadProps> = ({
  setStudentData,
  setAvailableFiles,
  isLoggedIn
}) => {
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
      const res = await API.uploadObject(jsonString, nameField, isLoggedIn);
      const data = JSON.parse(res);
      setStudentData(data);
      const filenames = await API.getFileList();
      setAvailableFiles(filenames);
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
