import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
  MutableRefObject
} from "react";

export interface StudentType {
  id: number;
  name: string;
  avg: number;
  group: number;
  email: string;
}
type MinStudent = {
  name: string;
  avg: number;
};

export type AnyStudent = StudentType | MinStudent;

export type StudentGroup = StudentType[];

export type GroupsObject = { [key: number]: StudentGroup } | {};

export type Files = string[] | [];

export type SetStudentsDispatch = Dispatch<SetStateAction<StudentType[]>>;

export type ViewProps = {
  studentData?: AnyStudent[];
  groupsData?: GroupsObject;
};

export interface StudentCardProps {
  data: StudentType;
}

export type SetFilesDispatch = Dispatch<SetStateAction<string[] | []>>;

export type InputChange = ChangeEvent<HTMLInputElement>;

export type EvtUnused = MouseEvent<any, any>;

export interface ClassProps {
  opt: string;
  id: number;
  groupSize: number;
}

export interface NavProps {
  view: string | undefined;
}
