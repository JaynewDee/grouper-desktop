import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  FC,
  MutableRefObject
} from "react";
import { API } from "../api";
import { Classes } from "./ClassList";
import DisplayControls from "./Students/DisplayControls";
import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

const { log } = console;
export const StudentView: FC<ContentProps> = ({
  studentData,
  setStudentData,
  fileOptions,
  setAvailableFiles
}) => {
  const [toggleAll, setToggleAll] = useState("");

  const expandAll = () => setToggleAll("all");
  const collapseAll = () => setToggleAll("none");
  const clearStudentsDisplay = () => setStudentData([]);

  const handleGetFile = async (e: MouseEvent<any, any>) => {
    const element = e.target as HTMLElement;
    const objName = element.textContent + ".json";
    const json = await API.readJson(objName as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
  };

  const handleDeleteFile: FileEvent = async (
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
    setStudentData([]);
  };

  const handleBuildGroups: FileEvent = async (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    // TODO
    // Call Rust @ build_groups
    const target = clickRef.current;
    const text = target?.textContent;
    const objName = text + ".json";
    const res = await API.buildGroups(objName, 4);
    const data = JSON.parse(res);
    log(data);
  };

  const stripExt = (opts: string[]) => opts.map((opt) => opt.split(".")[0]);
  // Packaged handlers for single-prop send
  const classHandlers: ClassHandlers = {
    handleGetFile,
    handleDeleteFile,
    handleBuildGroups,
    fileOptions: stripExt(fileOptions)
  };

  const controls: DisplayControllers = {
    expandAll,
    collapseAll,
    clearStudentsDisplay
  };

  return (
    <div
      className="content-box"
      key={studentData.reduce((acc, { avg }) => (acc += avg), 0)}
    >
      <Classes handlers={classHandlers} />

      {studentData.length > 0 && <DisplayControls controls={controls} />}

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
export type FileEvent = (
  e: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>
) => Promise<void>;

export interface ClassHandlers {
  handleGetFile: GetFileEvent;
  handleDeleteFile: FileEvent;
  handleBuildGroups: FileEvent;
  fileOptions: string[];
}

type SimpleSetter = () => void;

export interface DisplayControllers {
  expandAll: SimpleSetter;
  collapseAll: SimpleSetter;
  clearStudentsDisplay: SimpleSetter;
}
