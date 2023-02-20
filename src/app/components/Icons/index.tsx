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
  TiDelete({ size: "1.11rem", className: "delete-class-btn" });

export const BuildGroupsBtn = () =>
  HiUserGroup({ size: "1.11rem", className: "build-groups-btn" });

export const StudentIcon = () =>
  IoIosPerson({ size: "2rem", className: "student-view-link" });
export const GroupIcon = () =>
  IoIosPeople({ size: "2rem", className: "group-view-link" });

export const Placeholder = () =>
  GiMaterialsScience({ size: "2rem", className: "science-view-link" });

export const NavArrow = () =>
  BiRightArrowAlt({
    className: "nav-arrow"
  });
