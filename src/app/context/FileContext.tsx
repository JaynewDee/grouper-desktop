import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  MouseEvent
} from "react";
import { Invokers } from "../api";
import { Files, GroupObject, StudentType } from "../Types";
import { fileToString } from "../utils/parse";

interface ContextState {
  files?: string[];
  activeFile?: string;
  students?: StudentType[];
  groups?: GroupObject;
  view?: string;
  setFiles?: any;
  setActiveFile?: any;
  setStudents?: any;
  setGroups?: any;
  submitFile?: any;
  deleteFile?: any;
  setView?: any;
}

const FileContextState = createContext<ContextState>({});

const useFileContextState = () => {
  const context = useContext(FileContextState);

  if (context === undefined) {
    throw new Error("useUserContextState was used outside of its Provider");
  }

  return context;
};

const FileContextProvider = ({ children }: any) => {
  const [files, setAvailableFiles] = useState<Files>([]);
  const [activeFile, setCurrentFile] = useState("");
  const [students, setStudentData] = useState<StudentType[]>([]);
  const [groups, setGroupsData] = useState<GroupObject>({});
  const [view, setView] = useState<string>();

  useEffect(() => {
    Invokers.getFileList()
      .then((files) => {
        setAvailableFiles(files);
      })
      .catch((err) => console.error(err));
  }, []);

  const setFiles = useCallback(
    () =>
      Invokers.getFileList()
        .then((files) => setAvailableFiles(files))
        .catch((err) => console.error(err)),
    [setAvailableFiles]
  );

  const setActiveFile = useCallback((file: string) => {
    setCurrentFile(file);
  }, []);

  const setStudents = useCallback(
    (data: StudentType[]) => setStudentData(data),
    [setStudentData]
  );

  const setGroups = useCallback(
    (data: GroupObject[]) => {
      setGroupsData(data);
    },
    [setGroupsData]
  );

  const submitFile = useCallback((file: any) => {
    if (!file) return "You must select a file to upload.";
    const adjustState = async () => {
      const objName = file["name"];
      const jsonString = await fileToString(file);
      const res = await Invokers.uploadObject(jsonString, objName, false);
      const data = JSON.parse(res);
      const filenames = await Invokers.getFileList();

      setStudentData(data);
      setAvailableFiles(filenames);
      console.log(objName);
    };
    adjustState();
  }, []);

  const deleteFile = useCallback(
    (text: string) => {
      const adjustState = async () => {
        const objName = text + ".json";
        await Invokers.deleteFile(objName);
        setFiles();
      };
      adjustState();
    },
    [setFiles]
  );

  const ctx = useMemo(
    () => ({
      files,
      activeFile,
      students,
      groups,
      view,
      setFiles,
      setActiveFile,
      setStudents,
      setGroups,
      submitFile,
      setView,
      deleteFile
    }),
    [
      files,
      activeFile,
      students,
      groups,
      view,
      setFiles,
      setCurrentFile,
      setStudents,
      setGroups,
      submitFile,
      setView,
      deleteFile
    ]
  );

  return (
    <FileContextState.Provider value={ctx}>
      {children}
    </FileContextState.Provider>
  );
};

export { FileContextProvider, useFileContextState };
