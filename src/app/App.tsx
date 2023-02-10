import { useState } from "react";
import "./App.css";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Header from "./components/Header/Header";
import Upload from "./components/Inputs/Upload";

function App() {
  return (
    <>
      <Header />
      <Upload />
    </>
  );
}

export default App;
