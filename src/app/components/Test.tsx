import { useState } from "react";
import { API } from "../api";
import { getFields } from "../utils/parse";
import csv from "csvtojson";
import StudentCard from "./StudentCard";

export const TestContent: React.FC<any> = ({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [students, setStudents] = useState<any[]>([]);

  const handleGreet = async () => {
    const res = await API.greet();
  };

  const handleShow = async () => {
    const buckets = await API.showBuckets();
    const json = buckets.map((buck: string) => JSON.parse(buck));
  };

  const handleCreate = async () => {
    const res = await API.createBucket();
    console.log(res);
  };

  const handleListObjects = async () => {
    const res = await API.listObjects();
    console.log(res);
  };

  const handleGetObject = async () => {
    const res = await API.getObject();
    const objects = JSON.parse(res);
    setStudents(objects);
    console.log(objects);
  };

  return (
    <div className="test-content-box">
      <h3 style={{ marginTop: "9rem", textAlign: "center" }}>TEST</h3>
      <button onClick={handleGreet}>Greet</button>
      <button onClick={handleShow}>ShowBuckets</button>
      <button onClick={handleCreate}>Create Bucket</button>
      <button onClick={handleListObjects}>List Objects</button>
      <button onClick={handleGetObject}>Get Object</button>
      {students && students.map((stud: any) => <StudentCard data={stud} />)}
    </div>
  );
};
