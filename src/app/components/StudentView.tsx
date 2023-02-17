import { Dispatch, MouseEvent, SetStateAction, useMemo, useState } from "react";
import { API } from "../api";
import { Classes } from "./Students/ClassList";
import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

export const StudentView: React.FC<ContentProps> = ({
  studentData,
  setStudentData,
  fileOptions
}) => {
  const handleGetFile = async (e: MouseEvent<any, any>) => {
    const element = e.target as HTMLElement;
    const objName = element.textContent + ".json";
    const json = await API.readJson(objName as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
  };
  const clearStudentsDisplay = () => setStudentData([]);
  const stripExt = (opts: string[]) => opts.map((opt) => opt.split(".")[0]);
  // Packaged handlers for single-prop send
  const classHandlers: ClassHandlers = {
    handleGetFile,
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
          <button id="expand">Expand All</button>
          <button id="collapse">Collapse All</button>
          <button onClick={clearStudentsDisplay}>Clear</button>
        </div>
      )}
      {studentData &&
        studentData.map((stud: StudentType) => (
          <StudentCard data={stud} key={stud.id} />
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
  handleGetFile: GetFileEvent;
  fileOptions: string[];
}
