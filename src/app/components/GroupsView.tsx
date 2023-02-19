import React from "react";
import { StudentType } from "../Types";
import { Group, GroupType } from "./Groups/Groups";
import "./Groups/Groups.css";
type Groups = {
  [key: number]: GroupType;
};

const GroupsView = ({ groupsData }: { groupsData?: Groups }) => {
  return (
    <div className="groups-container">
      {groupsData &&
        Object.values(groupsData).map((group: GroupType, idx: number) =>
          Group(group, idx)
        )}
    </div>
  );
};

export default GroupsView;
