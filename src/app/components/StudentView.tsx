import { MouseEvent, FC, MutableRefObject } from "react";

import StudentCard from "./Students/StudentCard";
import { StudentType } from "./Students/StudentCard";

export const StudentView: FC<ViewProps> = ({ studentData, toggleAll }) => {
  return (
    <div
      className="content-box"
      key={studentData.reduce((acc, { avg }) => (acc += avg), 0)}
    >
      {studentData &&
        studentData.map((stud: StudentType) => (
          <StudentCard toggleAll={toggleAll} data={stud} key={stud.id} />
        ))}
    </div>
  );
};
