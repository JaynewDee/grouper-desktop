import { invoke } from "@tauri-apps/api/tauri";

export const API = {
  showBuckets: async (): Promise<any> => await invoke("list_buckets"),
  createBucket: async (): Promise<any> => await invoke("create_bucket"),
  listObjects: async (): Promise<any> => await invoke("list_objects"),
  getObject: async (objName: string): Promise<any> =>
    await invoke("get_object", { objName }),
  uploadObject: async (jsonData: string, objName: string): Promise<any> =>
    await invoke("upload_csv_object", { csvAsJson: jsonData, objName })
};
