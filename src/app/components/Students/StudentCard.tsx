import React, { useState } from "react";
import { ExpandArrow, CollapseArrow } from "../Icons";
import { Fields } from "./CardField";

export interface StudentType {
  id: number;
  name: string;
  avg: number;
  group: number;
  email: string;
}

const StudentCard = ({ data }: { data: StudentType }) => {
  const [cardState, setCardState] = useState("collapsed");

  const toggleCardState = () => {
    if (cardState === "collapsed") {
      setCardState("expanded");
    } else {
      setCardState("collapsed");
    }
  };

  return (
    <div
      key={data.id}
      className={cardState === "expanded" ? "card-expanded" : "card-collapsed"}
      onClick={toggleCardState}
      style={
        cardState === "collapsed"
          ? {
              justifyContent: "flex-start",
              animationDelay: `${String(data.id / 10)}s`
            }
          : { animationDelay: `${String(data.id / 10)}s` }
      }
    >
      <button onClick={toggleCardState} className="arrow-btn" key={data.id}>
        {cardState === "expanded" ? (
          <CollapseArrow key={data.name} />
        ) : (
          <ExpandArrow key={data.name} />
        )}
      </button>
      {cardState === "expanded" ? <>{Fields(data)}</> : <h2>{data.name}</h2>}
    </div>
  );
};

export default StudentCard;
