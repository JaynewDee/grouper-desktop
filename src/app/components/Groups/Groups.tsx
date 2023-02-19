import React from "react";
import { StudentType } from "../../Types";
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
    <p>{avg}</p>
  </div>
);

export const Group = (group: GroupType, idx: number) => (
  <div className="group-box">
    <h4>Group {idx + 1}</h4>
    {group.map(({ name, avg }: AnyStudent) => Student({ name, avg }))}
  </div>
);
