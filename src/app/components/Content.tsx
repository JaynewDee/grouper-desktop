import { useState } from "react";
import { API } from "../api";
import StudentCard from "./Students/StudentCard";

export const Content: React.FC<any> = ({
  studentData,
  setStudentData,
  fileOptions,
  setFileOptions
}: {
  studentData: any;
  setStudentData: any;
  fileOptions: string[];
  setFileOptions: any;
}) => {
  const [optionsDisplay, setOptionsDisplay] = useState(false);

  const expandAll = () => {
    setStudentData((prev: any) => [...prev.map((stud: any) => ({ ...stud }))]);
  };

  const toggleFileDisplay = () => setOptionsDisplay((prev) => !prev);

  const handleGetFile = async (e: any) => {
    const json = await API.getObject(e.target.textContent);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
    toggleFileDisplay();
  };
  return (
    <div className="content-box">
      <div className="btn-box">
        <button onClick={toggleFileDisplay}>CLASSES</button>
        {optionsDisplay ? (
          <div className="file-options-container">
            <hr className="shim-vertical" />

            {fileOptions.map((opt, idx) => (
              <p onClick={handleGetFile} key={idx} className="file-option">
                {opt}
              </p>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr style={{ width: "50%", borderRadius: "50%", marginBottom: "3rem" }} />
      {studentData &&
        studentData.map((stud: any, idx: number) => (
          <StudentCard data={stud} />
        ))}
    </div>
  );
};
