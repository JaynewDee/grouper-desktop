import { useState } from "react";
import "./App.css";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";
import { TestContent } from "./components/Test";

function App() {
  const [students, setStudents] = useState<any[]>([]);

  return (
    <>
      <Header />
      <Upload setStudentData={setStudents} />
      <TestContent studentData={students} setStudentData={setStudents} />
    </>
  );
}

export default App;
