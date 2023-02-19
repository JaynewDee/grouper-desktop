import { FC, useState, memo, useMemo, useRef } from "react";

import "./ClassList.css";
import { BuildGroupsBtn, DeleteClassBtn } from "../Icons";
import DisplayControls from "../DisplayControls/DisplayControls";
import { ClassesProps, ClassProps } from "../../Types";

const Class: FC<ClassProps> = ({
  handleGetFile,
  handleDeleteFile,
  handleBuildGroups,
  setStudentData,
  setGroupsData,
  setAvailableFiles,
  changeView,
  opt,
  id
}) => {
  const [hoverState, setHoverState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);

  const handleOptionClick = (e: any) =>
    handleGetFile(e, setStudentData, changeView);

  const handleMouseEnter = (_: any) => setHoverState(true);

  const handleMouseLeave = (_: any) => setHoverState(false);

  const deleteFile = async (e: any) =>
    await handleDeleteFile(
      e,
      clickRef,
      setAvailableFiles,
      setStudentData,
      setGroupsData
    );
  return (
    <div
      className="class-option-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoverState && <div onClick={deleteFile}>{DeleteClassBtn()}</div>}
      <p
        onClick={handleOptionClick}
        key={id}
        ref={clickRef}
        className="class-option"
      >
        {opt}
      </p>
      {hoverState && (
        <div
          onClick={async (e) => {
            await handleBuildGroups(e, clickRef, setStudentData, setGroupsData);
            changeView("groups");
          }}
        >
          {BuildGroupsBtn()}
        </div>
      )}
    </div>
  );
};

export const Classes: FC<ClassesProps> = memo(
  ({
    handlers: {
      handleGetFile,
      handleDeleteFile,
      handleBuildGroups,
      fileOptions
    },
    controls,
    isData,
    setStudentData,
    setGroupsData,
    setAvailableFiles,
    changeView
  }) => {
    //
    const [listState, setListState] = useState(false);
    //
    // useMemo(() => setListState((prev) => !prev), [fileOptions]);
    //
    return (
      <>
        <div className="classes-box" key={fileOptions.length}>
          <button onClick={() => setListState((prev) => !prev)}>
            CLASSROOMS
          </button>
          <div
            className={
              listState ? "class-options-expanded" : "class-options-collapsed"
            }
          >
            {fileOptions.length ? (
              fileOptions.map((opt: string, idx: number) => (
                <Class
                  handleGetFile={handleGetFile}
                  handleDeleteFile={handleDeleteFile}
                  handleBuildGroups={handleBuildGroups}
                  setStudentData={setStudentData}
                  setGroupsData={setGroupsData}
                  setAvailableFiles={setAvailableFiles}
                  changeView={changeView}
                  opt={opt}
                  id={idx}
                  key={idx}
                />
              ))
            ) : (
              <p>Upload a file to build your first classroom!</p>
            )}
          </div>
        </div>
        <hr className="divider-md" />
        {isData > 0 && <DisplayControls controls={controls} />}
      </>
    );
  }
);
