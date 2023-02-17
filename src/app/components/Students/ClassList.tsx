import React, { useState, memo, useMemo } from "react";
import { ClassHandlers, GetFileEvent } from "../StudentView";

const Class = ({
  handleGetFile,
  setListState,
  opt,
  id
}: {
  handleGetFile: GetFileEvent;
  setListState: any;
  opt: string;
  id: number;
}) => {
  const handleOptionClick = (e: any) => {
    handleGetFile(e);
  };
  return (
    <p onClick={handleOptionClick} key={id} className="class-option">
      {opt}
    </p>
  );
};
type ClassProps = {
  handlers: ClassHandlers;
};

export const Classes: React.FC<ClassProps> = memo(
  ({ handlers: { handleGetFile, fileOptions } }) => {
    const [listState, setListState] = useState(false);
    //
    //

    useMemo(() => setListState((prev) => !prev), [fileOptions]);
    //
    //
    return (
      <div className="classes-box" key={fileOptions.length}>
        <button onClick={() => setListState((prev) => !prev)}>CLASSES</button>
        <div
          className={
            listState ? "class-options-expanded" : "class-options-collapsed"
          }
        >
          {fileOptions.map((opt: string, idx: number) => (
            <Class
              setListState={setListState}
              handleGetFile={handleGetFile}
              opt={opt}
              id={idx}
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  }
);
