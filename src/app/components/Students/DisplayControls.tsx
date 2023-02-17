import { FC } from "react";
import { DisplayControllers } from "../StudentView";

interface ControlsProps {
  controls: DisplayControllers;
}
const DisplayControls: FC<ControlsProps> = ({ controls }) => {
  const { expandAll, collapseAll, clearStudentsDisplay } = controls;

  return (
    <div className="toggle-display-box">
      <button id="expand" onClick={expandAll}>
        Expand All
      </button>
      <button id="collapse" onClick={collapseAll}>
        Collapse All
      </button>
      <button onClick={clearStudentsDisplay}>Clear</button>
    </div>
  );
};

export default DisplayControls;
