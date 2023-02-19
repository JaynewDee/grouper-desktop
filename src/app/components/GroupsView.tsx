import React from "react";
import { StudentType } from "../Types";

const GroupsView = ({ groupsData }: { groupsData: any }) => {
  return (
    <div>
      {Object.values(groupsData).map((group: any, idx: number) => (
        <div>
          <h4>Group {idx + 1}</h4>
          {group.map((student: StudentType) => (
            <>
              <p>{student.name}</p>
              <p>{student.avg}</p>
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupsView;
