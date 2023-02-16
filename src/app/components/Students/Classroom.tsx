import { ClassHandlers } from "../Content";
import { GetFileEvent } from "../Content";

const Class = ({
  handleGetFile,
  opt,
  id
}: {
  handleGetFile: GetFileEvent;
  opt: string;
  id: number;
}) => (
  <p onClick={handleGetFile} key={id} className="class-option">
    {opt}
  </p>
);

export const Classes = ({
  handlers: { toggleFileDisplay, optionsDisplay, handleGetFile, fileOptions }
}: {
  handlers: ClassHandlers;
}) => (
  <div className="classes-box">
    <button onClick={toggleFileDisplay}>CLASSES</button>
    {optionsDisplay && (
      <div
        className="class-options-container"
        style={{ transform: "translateY(0%)" }}
      >
        {fileOptions.map((opt: string, idx: number) =>
          Class({ handleGetFile, opt, id: idx })
        )}
      </div>
    )}
  </div>
);
