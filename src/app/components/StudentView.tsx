import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useMemo,
  useState,
  FC,
  MutableRefObject
} from "react";
import { API } from "../api";
import { Classes } from "./ClassList";
import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

export const StudentView: FC<ContentProps> = ({
  studentData,
  setStudentData,
  fileOptions,
  setAvailableFiles
}) => {
  const [toggleAll, setToggleAll] = useState("");
  const expandAll = () => setToggleAll("all");
  const collapseAll = () => setToggleAll("none");

  const handleGetFile = async (e: MouseEvent<any, any>) => {
    const element = e.target as HTMLElement;
    const objName = element.textContent + ".json";
    const json = await API.readJson(objName as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
  };

  const handleDeleteFile: DeleteFileEvent = async (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    const element = clickRef.current as HTMLInputElement;
    const text = element.textContent;
    const objName = text + ".json";
    await API.deleteFile(objName);
    setAvailableFiles((prev) =>
      prev.filter((itemName) => itemName !== objName)
    );
  };
  const clearStudentsDisplay = () => setStudentData([]);

  const stripExt = (opts: string[]) => opts.map((opt) => opt.split(".")[0]);
  // Packaged handlers for single-prop send
  const classHandlers: ClassHandlers = {
    handleGetFile,
    handleDeleteFile,
    fileOptions: stripExt(fileOptions)
  };

  return (
    <div
      className="content-box"
      key={studentData.reduce((acc, { avg }) => (acc += avg), 0)}
    >
      <Classes handlers={classHandlers} />
      <hr
        style={{
          width: "50%",
          borderRadius: "50%",
          marginBottom: "3rem",
          marginTop: "0"
        }}
      />
      {studentData.length > 0 && (
        <div className="toggle-display-box">
          <button id="expand" onClick={expandAll}>
            Expand All
          </button>
          <button id="collapse" onClick={collapseAll}>
            Collapse All
          </button>
          <button onClick={clearStudentsDisplay}>Clear</button>
        </div>
      )}
      {studentData &&
        studentData.map((stud: StudentType) => (
          <StudentCard toggleState={toggleAll} data={stud} key={stud.id} />
        ))}
    </div>
  );
};

export type SetStudentState = Dispatch<SetStateAction<StudentType[]>>;

interface ContentProps {
  studentData: StudentType[];
  setStudentData: SetStudentState;
  fileOptions: string[];
  setAvailableFiles: Dispatch<SetStateAction<string[] | []>>;
}

export type GetFileEvent = (e: MouseEvent<any, any>) => Promise<void>;
export type DeleteFileEvent = (
  e: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>
) => Promise<void>;
export interface ClassHandlers {
  handleGetFile: GetFileEvent;
  handleDeleteFile: DeleteFileEvent;
  fileOptions: string[];
}
