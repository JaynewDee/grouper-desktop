import {
  useEffect,
  useState,
  MouseEvent,
  SetStateAction,
  Dispatch
} from "react";
import { useHoverEvent } from "../../hooks/useHover";
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

  return (
    <p onClick={handleGetFile} key={id} className="class-option">
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
    <div className="classes-box" key={fileOptions.length}>
      <button onClick={toggleOptionsDisplay}>CLASSES</button>
      <div
        className={
          listState ? "class-options-expanded" : "class-options-collapsed"
        }
      >
        {fileOptions.map((opt: string, idx: number) => (
          <Class handleGetFile={handleGetFile} opt={opt} id={idx} key={idx} />
        ))}
      </div>
    </div>
  );
};
