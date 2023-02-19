import { FC } from "react";
import { ControlsProps } from "../Types";

const DisplayControls: FC<ControlsProps> = ({ controls }) => {
  const { expandAll, collapseAll, clearContentDisplay } = controls;

  return (
    <div className="toggle-display-box">
      <button id="expand" onClick={expandAll}>
        Expand All
      </button>
      <button id="collapse" onClick={collapseAll}>
        Collapse All
      </button>
      <button onClick={clearContentDisplay}>Clear</button>
    </div>
  );
};

export default DisplayControls;
