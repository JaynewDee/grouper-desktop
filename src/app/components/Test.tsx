import { useState } from "react";
import { API } from "../api";
import { getFields } from "../utils/parse";
import csv from "csvtojson";

export const TestContent: React.FC<any> = ({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [response, setResponse] = useState<string | any[]>("");

  const handleGreet = async () => {
    const res = await API.greet();
    setResponse(res);
  };
  const handleShow = async () => {
    const buckets = await API.showBuckets();
    const json = buckets.map((buck: string) => JSON.parse(buck));
    setResponse(json);
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
    console.log(res);
    const json = JSON.parse(res);
    const jsonString = await csv({ output: "json" }).fromString(json.res);
    console.log(jsonString);
  };

  return (
    <div className="test-content-box">
      <h3 style={{ marginTop: "9rem", textAlign: "center" }}>TEST</h3>
      <button onClick={handleGreet}>Greet</button>
      <button onClick={handleShow}>ShowBuckets</button>
      <button onClick={handleCreate}>Create Bucket</button>
      <button onClick={handleListObjects}>List Objects</button>
      <button onClick={handleGetObject}>Get Object</button>
      <>
        {typeof response === "string" ? (
          <>{response}</>
        ) : (
          response.map(({ name, created }) => {
            <>
              <p>{name}</p>
              <p>{created}</p>
            </>;
          })
        )}
      </>
    </div>
  );
};
