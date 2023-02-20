import { invoke } from "@tauri-apps/api/tauri";
import { MutableRefObject, MouseEvent, Dispatch, SetStateAction } from "react";
import { fileToString } from "../utils/parse";

import { ChangeView, Setter, StudentType } from "../Types";

export const Invokers = {
  showBuckets: async (): Promise<any> => await invoke("list_buckets"),
  listObjects: async (): Promise<any> => await invoke("list_objects"),
  readJson: async (objName: string): Promise<string> =>
    await invoke("read_json", { objName }),
  getObject: async (objName: string): Promise<string> =>
    await invoke("get_file_s3", { objName }),
  uploadObject: async (
    jsonData: string,
    objName: string,
    loggedIn: boolean
  ): Promise<any> =>
    await invoke("upload_students_s3", {
      csvAsJson: jsonData,
      objName,
      loggedIn
    }),
  getFileList: async (): Promise<string[]> => await invoke("get_file_list"),
  deleteFile: async (objName: string): Promise<string> =>
    await invoke("delete_one_file", { objName }),
  checkConnection: async (): Promise<boolean> =>
    await invoke("check_connection"),
  buildGroups: async (objName: string, groupSize: 4): Promise<string> =>
    await invoke("build_groups", { objName, groupSize }),
  getGroupAvgs: async (groupsJson: string): Promise<string> =>
    await invoke("get_group_avgs", { groupsJson })
};

export const handleGetFile = async (
  e: MouseEvent<any, any>,
  setStudentData: Dispatch<SetStateAction<StudentType[]>>,
  changeView: ChangeView
) => {
  const element = e.target as HTMLElement;
  const objName = element.textContent + ".json";
  const json = await Invokers.readJson(objName as string);
  const studentData = JSON.parse(json);
  setStudentData(studentData);
  changeView("groups");
};
//

//

//

//
export const handleBuildGroups = async (
  _: MouseEvent<any, any>,
  clickRef: MutableRefObject<HTMLInputElement | null>,
  setStudentData: Setter,
  setGroupsData: Setter
) => {
  //
  const target = clickRef.current;
  const text = target?.textContent;
  const objName = text + ".json";

  const res = await Invokers.buildGroups(objName, 4);

  const groupAvgs = await Invokers.getGroupAvgs(res[0].slice());
  const students = JSON.parse(res[0]);
  setStudentData(students);
  const groups = JSON.parse(res[1]);
  setGroupsData(groups);
};
//
