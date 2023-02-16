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

  const useAnimationDelay = (id: number) => ({
    animationDelay: `${String(id / 10)}s`
  });

  return (
    <div
      key={data.avg}
      className={cardState === "expanded" ? "card-expanded" : "card-collapsed"}
      onClick={toggleCardState}
      style={useAnimationDelay(data.id)}
    >
      <button
        onClick={toggleCardState}
        className="arrow-btn"
        key={data.id * 100}
      >
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
