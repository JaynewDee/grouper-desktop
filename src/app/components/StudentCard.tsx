import React, { useState } from "react";
import { ExpandArrow, CollapseArrow } from "./Icons";

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
      {cardState === "expanded" ? (
        <>
          <div>
            <h4 className="student-field-header">Student</h4>
            <p className="student-field">{data.name}</p>
          </div>
          <div>
            <h4 className="student-field-header">GPA</h4>
            <p className="student-field">{data.avg}%</p>
          </div>
          <div>
            <h4 className="student-field-header">Group</h4>
            <p className="student-field">{data.group}</p>
          </div>
          <div>
            <h4 className="student-field-header">Email</h4>
            <p className="student-field">{data.email}</p>
          </div>
        </>
      ) : (
        <h3 style={{ marginLeft: "3rem", marginRight: "auto" }}>{data.name}</h3>
      )}
    </div>
  );
};

export default StudentCard;
