import React from "react";
import UploadExpander from "../Btns/UploadExpander";
import "./Upload.css";

const Upload = () => {
  return (
    <div className="file-upload-container">
      <input type="file"></input>
      <UploadExpander />
    </div>
  );
};

export default Upload;
