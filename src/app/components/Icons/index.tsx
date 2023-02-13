import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { TbHelp } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
export const Unlocked = BsFillUnlockFill;
export const Locked = BsFillLockFill;
export const Settings = IoMdSettings;
export const Help = TbHelp;

export const Arrow = BiRightArrowAlt;

export const ExpandArrow = BiRightArrowAlt({ size: "1.33rem" });
export const CollapseArrow = BiRightArrowAlt({
  style: { transform: "rotate(90deg)" },
  size: "1.33rem"
});
