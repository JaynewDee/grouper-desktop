import { StudentType } from "../../Types";
import { useAnimationDelay } from "../Students/StudentCard";
import "./Groups.css";

type MinStudent = {
  name: string;
  avg: number;
};

type AnyStudent = StudentType | MinStudent;

export type GroupType = AnyStudent[];

const Student = ({ name, avg }: MinStudent) => (
  <div className="group-student">
    <p>{name}</p>
  </div>
);

export const Group = (group: GroupType, idx: number, group_avg: number) => {
  return (
    <div className="group-box" style={useAnimationDelay(idx + 1)}>
      <h4>Group {idx + 1}</h4>
      <h5>AVG: {group_avg}</h5>
      {group.map(({ name, avg }: AnyStudent) => Student({ name, avg }))}
    </div>
  );
};
