import React from "react";
import { FC } from "react";
import { ViewProps } from "../Types";
import { useGroupAvgs } from "../utils/parse";
import { Group } from "./Groups/Groups";
import "./Groups/Groups.css";

const GroupsView: FC<ViewProps> = ({ groupsData }) => {
  const [groupAvgs, setGroupAvgs] = useGroupAvgs(groupsData || {});

  const data = Object.values(groupsData!);
  const hasData = data !== null && data !== undefined;

  return (
    <div className="groups-container" key={55}>
      {hasData &&
        Object.values(groupsData!).map((group: any, idx: number) => {
          return (
            <div key={idx}>
              {Group(group, idx, Object.values(groupAvgs)[idx])}
            </div>
          );
        })}
    </div>
  );
};

export default GroupsView;
