import { useState } from "react";
import { createPortal } from "react-dom";
import { Settings, Help, Unlocked, Locked } from "../Icons";
import SettingsContent from "./SettingsContent";
import "./Toolbar.css";
const toolbarRoot = document.getElementById("toolbar-root") as HTMLElement;

const Toolbar = ({ setLoggedIn, isLoggedIn }: any) => {
  const [toolbarState, setToolbarState] = useState(false);
  const [contentState, setContentState] = useState("settings");

  const viewLock = () => setContentState("lock");
  const viewSettings = () => setContentState("settings");
  const viewHelp = () => setContentState("help");

  const handleExpand = () => setToolbarState(true);
  const handleCollapse = () => setToolbarState(false);

  const ToolSwitch = (tool: string) => {
    type Tools = { [key: string]: any };

    const tools: Tools = {
      lock: "LOCK CONTENT",
      settings: <SettingsContent />,
      help: "HELP CONTENT"
    };

    return tools[tool] || <></>;
  };

  const Lock = isLoggedIn
    ? Unlocked({
        color: "white",
        className: "unlocked tool-btn",
        style: contentState === "lock" ? { color: "cyan" } : {},
        size: "1.33rem",
        onClick: viewLock
      })
    : Locked({
        color: "white",
        className: "locked tool-btn",
        style: contentState === "lock" ? { color: "cyan" } : {},
        size: "1.33rem",
        onClick: viewLock
      });

  return createPortal(
    <div
      onMouseEnter={handleExpand}
      onMouseLeave={handleCollapse}
      className="toolbar"
      style={
        toolbarState
          ? { transform: "translateY(0rem)" }
          : { transform: "translateY(10rem)" }
      }
    >
      <div className="tool-btns-container">
        {Lock}
        {Settings({
          color: "white",
          className: "settings-btn tool-btn",
          style: contentState === "settings" ? { color: "cyan" } : {},
          size: "1.5rem",
          onClick: viewSettings
        })}
        {Help({
          color: "white",
          className: "help-btn tool-btn",
          style: contentState === "help" ? { color: "cyan" } : {},
          size: "1.5rem",
          onClick: viewHelp
        })}
      </div>
      <div className="toolbar-content">{ToolSwitch(contentState)}</div>
    </div>,
    toolbarRoot
  );
};

export default Toolbar;
