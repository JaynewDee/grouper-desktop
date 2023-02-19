import React from "react";
import { StudentType } from "../Types";
import { useGroupAvgs } from "../utils/parse";
import { Group, GroupType } from "./Groups/Groups";
import "./Groups/Groups.css";

export type Groups = {
  [key: number]: GroupType;
};

const GroupsView = ({ groupsData }: { groupsData: Groups }) => {
  const [groupAvgs, setGroupAvgs] = useGroupAvgs(groupsData);

  return (
    <div className="groups-container">
      {groupsData &&
        Object.values(groupsData).map((group: GroupType, idx: number) => {
          return <>{Group(group, idx, Object.values(groupAvgs)[idx])}</>;
        })}
    </div>
  );
};

export default GroupsView;
