import { FC, useState, memo, useRef } from "react";
import { BuildGroupsBtn, DeleteClassBtn } from "../Icons";
import DisplayControls from "../DisplayControls/DisplayControls";
import { useFileContextState } from "../../context/FileContext";
import { ClassProps, EvtUnused } from "../../Types";
import "./ClassList.css";

const Class: FC<ClassProps> = ({ opt, id, groupSize }) => {
  const [hoverState, setHoverState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);
  const handleMouseEnter = (_: EvtUnused) => setHoverState(true);
  const handleMouseLeave = (_: EvtUnused) => setHoverState(false);

  const { getData, deleteFile } = useFileContextState();

  const handleFileSelection = (e: any) =>
    getData(e.target.textContent, Number(groupSize));

  const handleDeleteFile = (_: EvtUnused) => {
    const element = clickRef.current as HTMLInputElement;
    const text = element.textContent;
    deleteFile(text || "");
  };

  // const handleBuildGroups = (_: EvtUnused) => {
  //   const element = clickRef.current as HTMLInputElement;
  //   const text = element.textContent;
  //   sendForGroups(text, Number(groupSize));
  // };

  return (
    <div
      className="class-option-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoverState && (
        <div className="delete-class-btn" onClick={handleDeleteFile}>
          {DeleteClassBtn()}
        </div>
      )}
      <p
        key={id}
        ref={clickRef}
        onClick={handleFileSelection}
        className="class-option"
      >
        {opt.split(".")[0]}
      </p>
    </div>
  );
};

export const Classes: FC<any> = memo(({ isData }) => {
  const [groupSize, setGroupSize] = useState(4);
  const [listState, setListState] = useState(false);

  const { activeFile, files, sendForGroups } = useFileContextState();

  const handleSizeChange = (e: any) => {
    sendForGroups(activeFile, Number(e.target.value));
    setGroupSize(e.target.value);
  };

  return (
    <>
      <div className="classes-box">
        <button onClick={() => setListState((prev) => !prev)}>
          CLASSROOMS
        </button>
        <div
          className={
            listState ? "class-options-expanded" : "class-options-collapsed"
          }
        >
          {files && files.length ? (
            files.map((opt: string, idx: number) => (
              <Class groupSize={groupSize} opt={opt} id={idx} key={idx} />
            ))
          ) : (
            <p style={{ maxWidth: "9rem", textAlign: "center" }}>
              Upload a file to build your first classroom!
            </p>
          )}
        </div>
      </div>

      <hr className="divider-md" />

      {isData > 0 && <DisplayControls />}
    </>
  );
});
