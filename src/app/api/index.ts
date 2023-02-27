import { tauri } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/tauri";
import { getCurrent, appWindow, LogicalSize } from "@tauri-apps/api/window";

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
  buildGroups: async (objName: string, groupSize: number): Promise<string> =>
    await invoke("build_groups", { objName, groupSize }),
  getGroupAvgs: async (groupsJson: string): Promise<string> =>
    await invoke("get_group_avgs", { groupsJson }),
  groupsFromData: async (
    studentsJson: string,
    groupSize: number
  ): Promise<string> =>
    await invoke("groups_from_data", { studentsJson, groupSize }),
  saveGroups: async (groupsJson: string): Promise<string> =>
    await invoke("save_groups", { groupsJson })
};

export const Window = {
  app: () => appWindow,
  get: () => getCurrent(),
  setDims: (x: number, y: number) => getCurrent().setSize(new LogicalSize(x, y))
};
