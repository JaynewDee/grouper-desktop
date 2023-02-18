import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { TbHelp } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";

export const Unlocked = BsFillUnlockFill;
export const Locked = BsFillLockFill;
export const Settings = IoMdSettings;
export const Help = TbHelp;

export const Arrow = BiRightArrowAlt;

export const ExpandArrow = () => BiRightArrowAlt({ size: "1.33rem" });
export const CollapseArrow = () =>
  BiRightArrowAlt({
    style: { transform: "rotate(90deg)" },
    size: "1.33rem"
  });

export const DeleteClassBtn = () =>
  TiDelete({ size: "1rem", className: "delete-class-btn" });

export const BuildGroupsBtn = () =>
  HiUserGroup({ size: "1rem", className: "build-groups-btn" });
