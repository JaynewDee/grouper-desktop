import React from "react";
import { Window } from "../../api";

const SettingsContent = () => {
  const setSmall = () => Window.setDims(600, 800);
  const setMedium = () => Window.setDims(1080, 720);
  const setLarge = () => Window.setDims(1920, 1080);

  return (
    <div className="window-adjust-container">
      <h5>Window Size</h5>
      <button onClick={setSmall}>SMALL</button>
      <button onClick={setMedium}>MEDIUM</button>
      <button onClick={setLarge}>LARGE</button>
    </div>
  );
};

export default SettingsContent;
