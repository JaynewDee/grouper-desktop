import { FC } from "react";
import "./styles.css";

const DisplayControls: FC<any> = () => {
  const handleExpandAll = () => {};

  const handleCollapseAll = () => {};

  return (
    <div className="toggle-display-box">
      <button id="expand" onClick={handleExpandAll}>
        EXPAND ALL
      </button>
      <button id="collapse" onClick={handleCollapseAll}>
        COLLAPSE ALL
      </button>
      <button>CLEAR</button>
    </div>
  );
};

export default DisplayControls;
