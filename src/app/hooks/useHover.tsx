import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

type HookEvent = "enter" | "leave";

export const useHoverEvent = (event: HookEvent) => {
  const [utilsDisplay, setUtilsDisplay] = useState(false);
  const useMouseLeave = () => setUtilsDisplay(false);
  const useMouseEnter = () => setUtilsDisplay(true);

  if (event === "enter") {
    useMouseEnter();
  } else if (event === "leave") {
    useMouseLeave();
  }
  return utilsDisplay;
};
