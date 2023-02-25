import { FC } from "react";
import { AnyStudent, GroupsObject, StudentGroup } from "../../Types";
import { useAnimationDelay } from "../Students/StudentCard";
import "./Groups.css";

const Student: FC<AnyStudent> = ({ name, avg }) => (
  <div className="group-student" key={avg}>
    <p>{name}</p>
  </div>
);

export const Group = (group: StudentGroup, idx: number, groupAvg: number) => {
  return (
    <div className="group-box" style={useAnimationDelay(idx + 1)} key={idx}>
      <h4>Group {idx + 1}</h4>
      <h5>AVG: {groupAvg}</h5>
      {group.map(({ name, avg }: AnyStudent) => Student({ name, avg }))}
    </div>
  );
};
