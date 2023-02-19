import {
  BsFillUnlockFill,
  BsFillLockFill,
  BsArrowUpShort
} from "react-icons/bs";
import { IoMdSettings, IoIosPeople, IoIosPerson } from "react-icons/io";
import { TbHelp } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";
import { GiMaterialsScience } from "react-icons/gi";

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
  TiDelete({ size: "1.66rem", className: "delete-class-btn" });

export const BuildGroupsBtn = () =>
  HiUserGroup({ size: "1.66rem", className: "build-groups-btn" });

export const StudentIcon = () =>
  IoIosPerson({ size: "2.22rem", className: "student-view-link" });
export const GroupIcon = () =>
  IoIosPeople({ size: "2.33rem", className: "group-view-link" });

export const Placeholder = () =>
  GiMaterialsScience({ size: "2.33rem", className: "science-view-link" });

export const NavArrow = () =>
  BsArrowUpShort({ size: "2.33rem", className: "nav-arrow" });
