import { FC } from "react";
import { ViewProps } from "../Types";
import { useGroupAvgs } from "../utils/parse";
import { Group } from "./Groups/Groups";
import "./Groups/Groups.css";

const GroupsView: FC<ViewProps> = ({ groupsData }) => {
  const [groupAvgs, setGroupAvgs] = useGroupAvgs({});

  const data = groupsData && Object.values(groupsData);
  const hasData = data ?? false;

  const useAvgs = (avgs: { [key: string]: number }, idx: number): number =>
    Object.values(avgs)[idx];

  return (
    <div className="groups-container">
      {hasData &&
        data?.map((group: any, idx: number) => {
          return (
            <div key={idx}>
              {/*****/}
              {Group(group, idx, useAvgs(groupAvgs, idx))}
              {/*****/}
            </div>
          );
        })}
    </div>
  );
};

export default GroupsView;
