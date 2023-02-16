import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { API } from "../api";
import { Classes } from "./Students/Classroom";
import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

export const Content: React.FC<ContentProps> = ({
  studentData,
  setStudentData,
  fileOptions
}) => {
  const [optionsDisplay, setOptionsDisplay] = useState(false);

  const toggleFileDisplay = () => setOptionsDisplay((prev) => !prev);

  const handleGetFile = async (e: MouseEvent<any, any>) => {
    const element = e.target as HTMLElement;
    const json = await API.getObject(element.textContent as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
    toggleFileDisplay();
  };
  const clearStudentsDisplay = () => setStudentData([]);
  // Packaged handlers for single-prop send
  const classHandlers: ClassHandlers = {
    toggleFileDisplay,
    handleGetFile,
    fileOptions,
    optionsDisplay
  };

  return (
    <div className="content-box">
      <Classes handlers={classHandlers} displayState={optionsDisplay} />
      <hr style={{ width: "50%", borderRadius: "50%", marginBottom: "3rem" }} />
      {studentData.length > 0 && (
        <div className="toggle-display-box">
          <button id="expand">Expand All</button>
          <button id="collapse">Collapse All</button>
          <button onClick={clearStudentsDisplay}>Clear</button>
        </div>
      )}
      {studentData &&
        studentData.map((stud: StudentType) => (
          <>
            <StudentCard data={stud} />
          </>
        ))}
    </div>
  );
};

interface ContentProps {
  studentData: StudentType[];
  setStudentData: Dispatch<SetStateAction<StudentType[]>>;
  fileOptions: string[];
}

export type GetFileEvent = (e: MouseEvent<any, any>) => Promise<void>;

export interface ClassHandlers {
  toggleFileDisplay: () => void;
  handleGetFile: GetFileEvent;
  fileOptions: string[];
  optionsDisplay: boolean;
}
