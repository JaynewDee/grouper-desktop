import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { API } from "../api";
import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

interface ContentProps {
  studentData: StudentType[];
  setStudentData: Dispatch<SetStateAction<StudentType[]>>;
  fileOptions: string[];
}
export const Content: React.FC<ContentProps> = ({
  studentData,
  setStudentData,
  fileOptions
}) => {
  const [optionsDisplay, setOptionsDisplay] = useState(false);

  const expandAll = () => {
    setStudentData((prev: StudentType[]) => [
      ...prev.map((stud: StudentType) => ({ ...stud }))
    ]);
  };

  const toggleFileDisplay = () => setOptionsDisplay((prev) => !prev);

  const handleGetFile = async (e: MouseEvent<any, any>) => {
    const element = e.target as HTMLElement;
    const json = await API.getObject(element.textContent as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
    toggleFileDisplay();
  };
  return (
    <div className="content-box">
      <div className="btn-box">
        <button onClick={toggleFileDisplay}>CLASSES</button>
        {optionsDisplay && (
          <div className="file-options-container">
            {fileOptions.map((opt, idx) => (
              <p onClick={handleGetFile} key={idx} className="file-option">
                {opt}
              </p>
            ))}
          </div>
        )}
      </div>
      <hr style={{ width: "50%", borderRadius: "50%", marginBottom: "3rem" }} />
      {studentData &&
        studentData.map((stud: StudentType) => <StudentCard data={stud} />)}
    </div>
  );
};
