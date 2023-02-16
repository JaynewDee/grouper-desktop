import { useEffect, useState, MouseEvent } from "react";
import { ClassHandlers, GetFileEvent } from "../StudentView";

const Class = ({
  handleGetFile,
  opt,
  id
}: {
  handleGetFile: GetFileEvent;
  opt: string;
  id: number;
}) => {
  // const [utilsDisplay, setUtilsDisplay] = useState(false);
  //
  // const handleMouseEnter = (e: MouseEvent<HTMLParagraphElement>) =>
  //   setUtilsDisplay(true);
  // const handleMouseLeave = (e: MouseEvent<HTMLParagraphElement>) =>
  //   setUtilsDisplay(false);
  //

  return (
    <p
      onClick={handleGetFile}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      key={id}
      className="class-option"
    >
      {opt}
    </p>
  );
};

export const Classes = ({
  handlers: { toggleOptionsDisplay, optionsDisplay, handleGetFile, fileOptions }
}: {
  handlers: ClassHandlers;
}) => {
  const [listState, setListState] = useState(false);
  //
  //
  useEffect(() => {
    setListState((prev) => !prev);
  }, [optionsDisplay]);
  //
  //
  return (
    <div className="classes-box">
      <button onClick={toggleOptionsDisplay}>CLASSES</button>
      <div
        className={
          listState ? "class-options-expanded" : "class-options-collapsed"
        }
      >
        {fileOptions.map((opt: string, idx: number) =>
          Class({ handleGetFile, opt, id: idx })
        )}
      </div>
    </div>
  );
};
