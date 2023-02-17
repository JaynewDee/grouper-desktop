import { invoke } from "@tauri-apps/api/tauri";

export const API = {
  showBuckets: async (): Promise<any> => await invoke("list_buckets"),
  createBucket: async (): Promise<any> => await invoke("create_bucket"),
  listObjects: async (): Promise<any> => await invoke("list_objects"),
  readJson: async (objName: string): Promise<string> =>
    await invoke("read_json", { objName }),
  getObject: async (objName: string): Promise<string> =>
    await invoke("get_object", { objName }),
  uploadObject: async (
    jsonData: string,
    objName: string,
    loggedIn: boolean
  ): Promise<any> =>
    await invoke("upload_csv_object", {
      csvAsJson: jsonData,
      objName,
      loggedIn
    }),
  getFileList: async (): Promise<string[]> => await invoke("get_file_list"),
  deleteFile: async (objName: string): Promise<string> =>
    await invoke("delete_one_file", { objName }),
  checkConnection: async (): Promise<boolean> =>
    await invoke("check_connection")
};
