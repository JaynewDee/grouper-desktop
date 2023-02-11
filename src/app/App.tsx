import { useState } from "react";
import "./App.css";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";
import { TestContent } from "./components/Test";

function App() {
  return (
    <>
      <Header />
      <Upload />
      <TestContent />
    </>
  );
}

export default App;
