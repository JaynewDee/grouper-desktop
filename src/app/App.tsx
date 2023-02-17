import { useEffect, useState, memo } from "react";
import "./App.css";
import { API } from "./api";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";
import { StudentView } from "./components/StudentView";
import { StudentType } from "./components/Students/StudentCard";

type Files = string[] | [];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [availableFiles, setAvailableFiles] = useState<Files>([]);

  useEffect(() => {
    if (availableFiles.length === 0) {
      API.getFileList()
        .then((files) => setAvailableFiles(files))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Upload
        setStudentData={setStudents}
        setFileOptions={setAvailableFiles}
        isLoggedIn={loggedIn}
      />
      <StudentView
        studentData={students}
        setStudentData={setStudents}
        fileOptions={availableFiles}
      />
    </>
  );
}
export default memo(App);
