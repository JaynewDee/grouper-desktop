import { FC, useState, memo, useMemo, useRef } from "react";

import "./ClassList.css";
import { BuildGroupsBtn, DeleteClassBtn } from "../Icons";
import DisplayControls from "../Students/DisplayControls";
import { ClassesProps, ClassProps } from "../../Types";

const Class: FC<ClassProps> = ({
  handleGetFile,
  handleDeleteFile,
  handleBuildGroups,
  setStudentData,
  setGroupsData,
  setAvailableFiles,
  opt,
  id
}) => {
  const [hoverState, setHoverState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);

  const handleOptionClick = (e: any) => handleGetFile(e, setStudentData);

  const handleMouseEnter = (_: any) => setHoverState(true);

  const handleMouseLeave = (_: any) => setHoverState(false);

  return (
    <div
      className="class-option-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoverState && (
        <div
          onClick={(e) =>
            handleDeleteFile(e, clickRef, setAvailableFiles, setStudentData)
          }
        >
          {DeleteClassBtn()}
        </div>
      )}
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
          onClick={(e) =>
            handleBuildGroups(e, clickRef, setStudentData, setGroupsData)
          }
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
    setAvailableFiles
  }) => {
    //
    const [listState, setListState] = useState(false);
    //
    useMemo(() => setListState((prev) => !prev), [fileOptions]);
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
