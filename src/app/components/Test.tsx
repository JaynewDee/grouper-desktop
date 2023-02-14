import { API } from "../api";
import StudentCard from "./Students/StudentCard";

export const TestContent: React.FC<any> = ({
  studentData,
  setStudentData
}: {
  studentData: any;
  setStudentData: any;
}) => {
  const handleShow = async () => {
    const buckets = await API.showBuckets();
    const json = buckets.map((buck: string) => JSON.parse(buck));
  };

  const handleListObjects = async () => {
    const res = await API.listObjects();
    console.log(res);
  };

  const handleGetObject = async () => {
    const res = await API.getObject("test-bcs.csv");
    const studentObjects = JSON.parse(res);
    setStudentData(studentObjects);
    console.log(studentObjects);
  };

  const expandAll = () => {
    setStudentData((prev: any) => [...prev.map((stud: any) => ({ ...stud }))]);
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
      {studentData &&
        studentData.map((stud: any) => <StudentCard data={stud} />)}
    </div>
  );
};
