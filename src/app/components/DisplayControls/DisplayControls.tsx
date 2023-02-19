import { FC } from "react";
import { ControlsProps } from "../../Types";
import "./styles.css";
const DisplayControls: FC<ControlsProps> = ({ controls }) => {
  const { expandAll, collapseAll, clearContentDisplay } = controls;

  return (
    <div className="toggle-display-box">
      <button id="expand" onClick={expandAll}>
        EXPAND ALL
      </button>
      <button id="collapse" onClick={collapseAll}>
        COLLAPSE ALL
      </button>
      <button onClick={clearContentDisplay}>CLEAR</button>
    </div>
  );
};

export default DisplayControls;
