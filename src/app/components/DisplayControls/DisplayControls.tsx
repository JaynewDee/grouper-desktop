import { FC } from "react";
import "./styles.css";

const DisplayControls: FC<any> = () => {
  return (
    <div className="toggle-display-box">
      <button id="expand">EXPAND ALL</button>
      <button id="collapse">COLLAPSE ALL</button>
      <button>CLEAR</button>
    </div>
  );
};

export default DisplayControls;
