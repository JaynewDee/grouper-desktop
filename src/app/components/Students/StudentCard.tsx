import React, { useState } from "react";
import { ExpandArrow, CollapseArrow } from "../Icons";
import { Fields } from "./CardField";

const StudentCard = ({ data }: { data: any }) => {
  const [cardState, setCardState] = useState("collapsed");

  const toggleCardState = () => {
    cardState === "collapsed"
      ? setCardState("expanded")
      : setCardState("collapsed");
  };

  return (
    <div
      key={data.id}
      className="student-card"
      style={cardState === "collapsed" ? { justifyContent: "flex-start" } : {}}
    >
      <button onClick={toggleCardState} className="arrow-btn">
        {cardState === "expanded" ? CollapseArrow : ExpandArrow}
      </button>
      {cardState === "expanded" ? <>{Fields(data)}</> : <h2>{data.name}</h2>}
    </div>
  );
};

export default StudentCard;
