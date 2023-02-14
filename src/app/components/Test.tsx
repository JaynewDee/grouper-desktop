import { useState } from "react";
import { API } from "../api";
import { getFields } from "../utils/parse";
import csv from "csvtojson";
import StudentCard from "./Students/StudentCard";

export const TestContent: React.FC<any> = ({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [students, setStudents] = useState<any[]>([]);

  const handleShow = async () => {
    const buckets = await API.showBuckets();
    const json = buckets.map((buck: string) => JSON.parse(buck));
  };

  const handleListObjects = async () => {
    const res = await API.listObjects();
    console.log(res);
  };

  const handleGetObject = async () => {
    const res = await API.getObject();
    const studentObjects = JSON.parse(res);
    setStudents(studentObjects);
    console.log(studentObjects);
  };

  const expandAll = () => {
    setStudents((prev) => [...prev.map((stud) => ({ ...stud }))]);
  };

  return (
    <div className="test-content-box">
      <h3 style={{ marginTop: "7rem", textAlign: "center" }}>TEST</h3>
      <div className="btn-box">
        <button onClick={handleShow}>ShowBuckets</button>
        <button onClick={handleListObjects}>List Objects</button>
        <button onClick={handleGetObject}>Fetch CSV</button>
      </div>
      <hr style={{ width: "50%", borderRadius: "50%" }} />
      {students && students.map((stud: any) => <StudentCard data={stud} />)}
    </div>
  );
};
