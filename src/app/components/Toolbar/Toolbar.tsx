import { Settings, Help, Unlocked, Locked } from "../Icons";

const Toolbar = ({ setLoggedIn, isLoggedIn }: any) => {
  const toggleLock = () => {
    setLoggedIn((prev: boolean) => !prev);
  };
  const Lock = isLoggedIn
    ? Unlocked({
        color: "white",
        className: "unlocked",
        size: "1rem",
        onClick: toggleLock
      })
    : Locked({
        color: "white",
        className: "locked",
        size: "1rem",
        onClick: toggleLock
      });
  return (
    <div>
      <div className="toolbar">
        {Lock}
        {Settings({
          color: "white",
          className: "settings-btn",
          size: "1.11rem"
        })}
        {Help({ color: "white", className: "help-btn", size: "1.11rem" })}
      </div>
    </div>
  );
};

export default Toolbar;
