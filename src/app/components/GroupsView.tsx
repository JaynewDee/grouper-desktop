import { FC } from "react";
import { ViewProps } from "../Types";
import { useGroupAvgs } from "../utils/parse";
import { Group } from "./Groups/Groups";
import "./Groups/Groups.css";

const GroupsView: FC<ViewProps> = ({ groupsData }) => {
  const [groupAvgs, setGroupAvgs] = useGroupAvgs(groupsData);

  const data = Object.values(groupsData!);
  const hasData = data !== null && data !== undefined;

  return (
    <div className="groups-container">
      {hasData &&
        Object.values(groupsData!).map((group: any, idx: number) => {
          return <>{Group(group, idx, Object.values(groupAvgs)[idx])}</>;
        })}
    </div>
  );
};

export default GroupsView;
