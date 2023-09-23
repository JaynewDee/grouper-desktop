import { FC } from "react";
import "./styles.css";

const DisplayControls: FC<any> = () => {
  const handleExpandAll = () => {
    const closedCards = document.querySelectorAll(".card-collapsed")
    for (const el of [...closedCards]) {
      (el && el as HTMLElement).click()
    }
  };


  const handleCollapseAll = () => {
    const openCards = document.querySelectorAll(".card-expanded")
    for (const el of [...openCards]) {
      (el && el as HTMLElement).click()
    }
  };

  return (
    <div className="toggle-display-box">
      <button id="expand" onClick={handleExpandAll}>
        EXPAND ALL
      </button>
      <button id="collapse" onClick={handleCollapseAll}>
        COLLAPSE ALL
      </button>
    </div>
  );
};

export default DisplayControls;
