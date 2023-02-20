import { FC, useState, memo, useRef } from "react";

import { BuildGroupsBtn, DeleteClassBtn } from "../Icons";
import DisplayControls from "../DisplayControls/DisplayControls";
import { ClassesProps, ClassProps } from "../../Types";
import "./ClassList.css";
import { useFileContextState } from "../../context/FileContext";

const Class: FC<any> = ({ opt, id }) => {
  const [hoverState, setHoverState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);

  const handleMouseEnter = (_: any) => setHoverState(true);

  const handleMouseLeave = (_: any) => setHoverState(false);

  const { getData, deleteFile } = useFileContextState();

  const handleFileSelection = (e: any) => {
    getData(e.target.textContent);
  };
  const handleDeleteFile = (e: any) => {
    const element = clickRef.current as HTMLInputElement;
    const text = element.textContent;
    deleteFile(text);
  };
  return (
    <div
      className="class-option-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoverState && <div onClick={handleDeleteFile}>{DeleteClassBtn()}</div>}
      <p
        key={id}
        ref={clickRef}
        onClick={handleFileSelection}
        className="class-option"
      >
        {opt.split(".")[0]}
      </p>
      {hoverState && <div>{BuildGroupsBtn()}</div>}
    </div>
  );
};

export const Classes: FC<any> = memo(({ isData }) => {
  //
  const [listState, setListState] = useState(false);
  //
  const { files } = useFileContextState();
  //
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
          {files ? (
            files.map((opt: string, idx: number) => (
              <Class opt={opt} id={idx} key={idx} />
            ))
          ) : (
            <p>Upload a file to build your first classroom!</p>
          )}
        </div>
      </div>
      <hr className="divider-md" />
      {isData > 0 && <DisplayControls />}
    </>
  );
});
