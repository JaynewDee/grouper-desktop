import { useState } from "react";
import { API } from "../api";
import csv from "csvtojson";
export const TestContent = () => {
  const [displayState, setDisplayState] = useState(false);
  const [response, setResponse] = useState();
  const handleGreet = async () => {
    if (!displayState) {
      const res = await API.greet();
    } else {
    }
  };
  const handleShow = async () => {
    if (!displayState) {
      const bucks = await API.showBuckets();
      const json = bucks.map((buck: string) => JSON.parse(buck));
      setDisplayState(json);
    }
  };

  const handleCreate = async () => {
    const res = await API.createBucket();
    console.log(res);
    setDisplayState(res);
  };

  const handleListObjects = async () => {
    const res = await API.listObjects();
    console.log(res);
  };

  const handleGetObject = async () => {
    const res = await API.getObject();
    const json = JSON.parse(res);
    const csvString = await csv().fromString(json.res);
    console.log(csvString);
  };

  return (
    <div className="test-content-box">
      <h3 style={{ marginTop: "9rem", textAlign: "center" }}>TEST</h3>
      <button onClick={handleGreet}>Greet</button>
      <button onClick={handleShow}>ShowBuckets</button>
      <button onClick={handleCreate}>Create Bucket</button>
      <button onClick={handleListObjects}>List Objects</button>
      <button onClick={handleGetObject}>Get Object</button>
      <div className="bucket-list"></div>
    </div>
  );
};
