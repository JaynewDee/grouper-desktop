import React, { useEffect } from "react";
import { StudentType } from "../Types";
import { useGroupAvgs } from "../utils/parse";
import { Group, GroupType } from "./Groups/Groups";
import "./Groups/Groups.css";

export type Groups = {
  [key: number]: GroupType;
};

const GroupsView = ({ groupsData }: { groupsData: Groups }) => {
  const [groupAvgs, setGroupAvgs] = useGroupAvgs(groupsData);

  const data = Object.values(groupsData);
  const hasData = data !== null && data !== undefined;

  return (
    <div className="groups-container">
      {hasData &&
        Object.values(groupsData).map((group: GroupType, idx: number) => {
          return <>{Group(group, idx, Object.values(groupAvgs)[idx])}</>;
        })}
    </div>
  );
};

export default GroupsView;
