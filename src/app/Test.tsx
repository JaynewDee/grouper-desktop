import { useState } from "react";
import { API } from "./api";

const Greet = () => {
  const [greeting, setGreeting] = useState("");
  const handleGreet = async () => {
    if (greeting === "") {
      const res = await API.greet();
      setGreeting(res);
    } else {
      setGreeting("");
    }
  };
  return (
    <>
      <button onClick={handleGreet}>Greet</button>
      <div>{greeting}</div>
    </>
  );
};

const ShowBuckets = () => {
  const [buckets, setBuckets] = useState<any>();
  const handleShow = async () => {
    if (!buckets) {
      const bucks = await API.showBuckets();
      const json = bucks.map((buck: string) => JSON.parse(buck));
      setBuckets(json);
    } else {
      setBuckets(null);
    }
  };
  return (
    <>
      <button onClick={handleShow}>ShowBuckets</button>
      {buckets ? (
        buckets.map((buck: any) => (
          <div>
            <p>Name: {buck.name}</p>
            <p>Created: {new Date(buck.created * 1000).toLocaleDateString()}</p>
            <hr />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export const TestContent = () => {
  return (
    <div className="test-content-box">
      <h3 style={{ marginTop: "6rem", textAlign: "center" }}>TEST</h3>
      {Greet()}
      {ShowBuckets()}
    </div>
  );
};
