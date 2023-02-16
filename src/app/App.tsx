import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./api";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";
import { Content } from "./components/Content";
import { StudentType } from "./components/Students/StudentCard";

type Files = string[] | [];

function App() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [availableFiles, setAvailableFiles] = useState<Files>([]);

  useEffect(() => {
    if (availableFiles.length === 0) {
      API.listObjects()
        .then((files) => setAvailableFiles(files))
        .catch((err) => console.error(err));
    }
  }, []);
  console.log(students);
  return (
    <>
      <Header />
      <Upload setStudentData={setStudents} setFileOptions={setAvailableFiles} />
      <Content
        studentData={students}
        setStudentData={setStudents}
        fileOptions={availableFiles}
      />
    </>
  );
}

export default App;
