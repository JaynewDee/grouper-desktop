import { FC } from "react";
import { StudentType, ViewProps } from "../Types";

import StudentCard from "./Students/StudentCard";

export const StudentView: FC<any> = ({ studentData }) => {
  return (
    <div
      className="content-box"
      key={studentData}
    >
      {studentData &&
        studentData.map((stud: StudentType) => (
          <StudentCard data={stud} key={stud.id} />
        ))}
    </div>
  );
};
