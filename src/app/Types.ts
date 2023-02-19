import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  MutableRefObject,
  ChangeEvent
} from "react";

export type SetStudentState = Dispatch<SetStateAction<StudentType[]>>;

export interface ViewProps {
  studentData: StudentType[];
  toggleAll: string;
  controls: DisplayControllers;
}

export type Files = string[] | [];

export type View = "students" | "groups";

export type ChangeView = Dispatch<SetStateAction<View>>;

export type GetFileEvent = (
  e: MouseEvent<any, any>,
  setStudentData: SetStudentState
) => Promise<void>;

export type FileEvent = (
  e: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>
) => Promise<void>;

export interface ClassHandlers {
  handleGetFile: any;
  handleDeleteFile: any;
  handleBuildGroups: any;
  fileOptions: string[];
}

export type SimpleSetter = () => void;

export interface DisplayControllers {
  expandAll: SimpleSetter;
  collapseAll: SimpleSetter;
  clearStudentsDisplay: SimpleSetter;
}

export type SetFiles = Dispatch<SetStateAction<string[] | []>>;

export type InputChange = ChangeEvent<HTMLInputElement>;

export interface UploadProps {
  setStudentData: SetStudentState;
  setAvailableFiles: SetFiles;
  isLoggedIn: boolean;
}

export interface StudentType {
  id: number;
  name: string;
  avg: number;
  group: number;
  email: string;
}

export interface ControlsProps {
  controls: DisplayControllers;
}

export interface HeaderProps {
  isLoggedIn: boolean;
  setLoggedIn: any;
}

export type EvtUnused = MouseEvent<any, any>;

export interface ClassProps {
  handleGetFile: GetFileEvent;
  handleDeleteFile: (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>,
    setAvailableFiles: Dispatch<SetStateAction<any>>,
    setStudentData: Dispatch<SetStateAction<any>>
  ) => Promise<void>;
  handleBuildGroups: (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>,
    setStudentData: Setter,
    setGroupsData: Setter
  ) => Promise<void>;
  setStudentData: Dispatch<SetStateAction<any>>;
  setGroupsData: Dispatch<SetStateAction<any>>;
  setAvailableFiles: Dispatch<SetStateAction<any>>;
  opt: string;
  id: number;
}

export type ClassesProps = {
  handlers: ClassHandlers;
  controls: DisplayControllers;
  isData: number;
  setStudentData: Dispatch<SetStateAction<any>>;
  setGroupsData: Dispatch<SetStateAction<any>>;
  setAvailableFiles: Dispatch<SetStateAction<any>>;
  handleBuildGroups: (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>,
    setStudentData: Setter,
    setGroupsData: Setter
  ) => Promise<void>;
};

export type GetFile = (
  e: MouseEvent<any, any>,
  { setStudentData }: { setStudentData: Setter }
) => Promise<void>;
export type DeleteFile = (
  _: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>
) => Promise<void>;

export type BuildGroups = (
  _: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>,
  setter: Setter
) => Promise<void>;
export type FileList = (s: Setter) => Promise<void>;

export type Setter = Dispatch<SetStateAction<any>>;

export type HandlerArgs = {
  setAvailableFiles: Setter;
  setStudentData: Setter;
  setNameField?: Setter;
  setGroupsData?: Setter;
};
