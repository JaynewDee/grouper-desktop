import { invoke } from "@tauri-apps/api/tauri";
import { MutableRefObject, MouseEvent, Dispatch, SetStateAction } from "react";
import { fileToString } from "../utils/parse";

import { Files, Setter, StudentType } from "../Types";

const Invokers = {
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
    await invoke("build_groups", { objName, groupSize })
};

const Handlers = (invokers: typeof Invokers) => ({
  handleGetFile: async (
    e: MouseEvent<any, any>,
    setStudentData: Dispatch<SetStateAction<StudentType[]>>
  ) => {
    const element = e.target as HTMLElement;
    const objName = element.textContent + ".json";
    const json = await invokers.readJson(objName as string);
    const studentData = JSON.parse(json);
    setStudentData(studentData);
  },
  //
  handleGetFileList: async ({
    setAvailableFiles
  }: {
    setAvailableFiles: Dispatch<SetStateAction<Files>>;
  }) =>
    Invokers.getFileList()
      .then((files) => setAvailableFiles(files))
      .catch((err) => console.error(err)),
  //
  handleFileSubmit: async (
    _: MouseEvent<HTMLButtonElement>,
    ref: MutableRefObject<HTMLInputElement | null>,
    nameField: string,
    isLoggedIn: boolean,
    setAvailableFiles: Dispatch<SetStateAction<string[]>>,
    setStudentData: Dispatch<SetStateAction<StudentType[]>>,
    setNameField: Dispatch<SetStateAction<string>>,
    displayErr: any
  ) => {
    if (!ref.current) {
      displayErr("You must select a file to upload.");
      return;
    }
    if (nameField.length < 3) {
      displayErr("The name for your file must be at least 3 characters long");
      return;
    }
    if (ref.current) {
      const file = ref.current.files![0];
      const jsonString = await fileToString(file);
      const res = await Invokers.uploadObject(
        jsonString,
        nameField,
        isLoggedIn
      );
      const data = JSON.parse(res);
      setStudentData(data);
      const filenames = await Invokers.getFileList();
      setAvailableFiles(filenames);
      setNameField!("");
    }
  },
  //
  handleDeleteFile: async (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>,
    setAvailableFiles: Dispatch<SetStateAction<any>>,
    setStudentData: Dispatch<SetStateAction<any>>
  ) => {
    const element = clickRef.current as HTMLInputElement;
    const text = element.textContent;
    const objName = text + ".json";
    await invokers.deleteFile(objName);
    setAvailableFiles((prev: string[]) =>
      prev.filter((itemName) => itemName !== objName)
    );
    setStudentData([]);
  },
  //
  handleBuildGroups: async (
    _: MouseEvent<any, any>,
    clickRef: MutableRefObject<HTMLInputElement | null>,
    setStudentData: Setter,
    setGroupsData: Setter
  ) => {
    //
    const target = clickRef.current;
    const text = target?.textContent;
    const objName = text + ".json";

    const res = await invokers.buildGroups(objName, 4);
    const students = JSON.parse(res[0]);
    setStudentData(students);
    const groups = JSON.parse(res[1]);
    setGroupsData(groups);
    console.log(groups);
  }
});

export default Handlers(Invokers);
