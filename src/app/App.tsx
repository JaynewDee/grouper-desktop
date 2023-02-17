import { FC, useEffect, useState, memo, Dispatch, SetStateAction } from "react";
import "./App.css";
import { API } from "./api";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";
import { StudentView } from "./components/StudentView";
import { StudentType } from "./components/Students/StudentCard";

type Files = string[] | [];

const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudentData] = useState<StudentType[]>([]);

  const [availableFiles, setAvailableFiles] = useState<Files>([]);
  console.log(availableFiles);
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
        setStudentData={setStudentData}
        setAvailableFiles={setAvailableFiles}
        isLoggedIn={loggedIn}
      />
      <StudentView
        studentData={students}
        setStudentData={setStudentData}
        fileOptions={availableFiles}
        setAvailableFiles={setAvailableFiles}
      />
    </>
  );
};
export default memo(App);
