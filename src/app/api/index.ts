import { invoke } from "@tauri-apps/api/tauri";

export const API = {
  showBuckets: async (): Promise<any> => await invoke("list_buckets"),
  createBucket: async (): Promise<any> => await invoke("create_bucket"),
  listObjects: async (): Promise<any> => await invoke("list_objects"),
  getObject: async (): Promise<any> => await invoke("get_object")
};
