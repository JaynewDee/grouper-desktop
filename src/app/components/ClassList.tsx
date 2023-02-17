import { FC, useState, memo, useMemo, useRef } from "react";
import { ClassHandlers, DeleteFileEvent, GetFileEvent } from "./StudentView";
import "./ClassList.css";
import { DeleteClassBtn } from "./Icons";

interface ClassProps {
  handleGetFile: GetFileEvent;
  handleDeleteFile: DeleteFileEvent;
  opt: string;
  id: number;
}

const Class: FC<ClassProps> = ({
  handleGetFile,
  handleDeleteFile,
  opt,
  id
}) => {
  const [hoverState, setHoverState] = useState(false);

  const clickRef = useRef<HTMLInputElement | null>(null);

  const handleOptionClick = (e: any) => handleGetFile(e);

  const handleMouseEnter = (_: any) => setHoverState(true);

  const handleMouseLeave = (_: any) => setHoverState(false);

  return (
    <div
      className="class-option-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hoverState && (
        <div onClick={(e) => handleDeleteFile(e, clickRef)}>
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
    </div>
  );
};

type ClassesProps = {
  handlers: ClassHandlers;
};

export const Classes: FC<ClassesProps> = memo(
  ({ handlers: { handleGetFile, handleDeleteFile, fileOptions } }) => {
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
      </>
    );
  }
);
