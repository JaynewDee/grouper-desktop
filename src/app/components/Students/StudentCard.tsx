import { useEffect, useState, FC } from "react";
import { ExpandArrow, CollapseArrow } from "../Icons";
import { Fields } from "./CardField";
import "./StudentCard.css";

export interface CardProps {
  data: any;
  toggleAll: string;
}
const StudentCard: FC<CardProps> = ({ data, toggleAll }) => {
  const [cardState, setCardState] = useState("collapsed");

  useEffect(() => {
    if (toggleAll === "all") {
      setCardState("expanded");
    } else if (toggleAll === "none") {
      setCardState("collapsed");
    } else return;
  }, [toggleAll]);

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
          <ExpandArrow key={data.name} />
        ) : (
          <CollapseArrow key={data.name} />
        )}
      </button>
      {cardState === "expanded" ? (
        <div className="card-content-container">
          <h2
            className="student-header"
            style={{ marginLeft: "0", marginRight: "3rem" }}
          >
            {data.name}
          </h2>
          <div className="fields-container">{Fields(data)}</div>
        </div>
      ) : (
        <h2>{data.name}</h2>
      )}
    </div>
  );
};

export default StudentCard;
