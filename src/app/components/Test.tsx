import { useState } from "react";
import { API } from "../api";
import { getFields } from "../utils/parse";
import csv from "csvtojson";

export const TestContent = () => {
  const [displayState, setDisplayState] = useState(false);

  const handleGreet = async () => {
    const res = await API.greet();
    console.log(res);
  };
  const handleShow = async () => {
    const bucks = await API.showBuckets();
    const json = bucks.map((buck: string) => JSON.parse(buck));
    console.log(json);
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
    const json = JSON.parse(res);
    const csvString = await csv().fromString(json.res);
    console.log(csvString);
    const parsed = getFields(csvString);
    console.log(parsed);
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
