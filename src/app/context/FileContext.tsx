import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect
} from "react";
import { Invokers } from "../api";
import { Files, GroupsObject, StudentType } from "../Types";
import { fileToString } from "../utils/parse";

interface ContextState {
  files?: string[];
  activeFile?: string;
  students?: StudentType[];
  groups?: GroupsObject;
  view?: string;
  setFiles?: any;
  setActiveFile?: any;
  setStudents?: any;
  setGroups?: any;
  submitFile?: any;
  deleteFile?: any;
  adjustView?: any;
  getData?: any;
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
  const [groups, setGroupsData] = useState<GroupsObject>({});
  const [view, setView] = useState<string>("");

  useEffect(() => {
    Invokers.getFileList()
      .then((files) => {
        setAvailableFiles(files);
      })
      .catch((err) => console.error(err));
  }, []);

  const adjustView = useCallback(
    (view: string) => {
      setView(view);
    },
    [setView]
  );

  const setFiles = useCallback(
    () =>
      Invokers.getFileList()
        .then((files) => setAvailableFiles(files))
        .catch((err) => console.error(err)),
    [setAvailableFiles]
  );

  const setActiveFile = useCallback(
    (file: string) => {
      setCurrentFile(file);
    },
    [setCurrentFile]
  );

  const submitFile = useCallback(
    (file: any) => {
      if (!file) return "You must select a file to upload.";
      const adjustState = async () => {
        const objName = file["name"].split(".")[0];
        const jsonString = await fileToString(file);
        await Invokers.uploadObject(jsonString, objName, false);
        const filenames = await Invokers.getFileList();
        setAvailableFiles(filenames);
      };
      adjustState();
    },
    [setAvailableFiles]
  );

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

  const getData = useCallback(
    (text: string) => {
      const adjustState = async () => {
        const objName = text + ".json";
        const res = await Invokers.buildGroups(objName, 4);
        const students = JSON.parse(res[0]);
        const groups = JSON.parse(res[1]);

        setStudentData(students);
        setGroupsData(groups);
        setView("students");
      };
      adjustState();
    },
    [setStudentData, setGroupsData, setView]
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
      submitFile,
      adjustView,
      deleteFile,
      getData
    }),
    [
      files,
      activeFile,
      students,
      groups,
      view,
      setFiles,
      setCurrentFile,
      submitFile,
      adjustView,
      deleteFile,
      getData
    ]
  );

  return (
    <FileContextState.Provider value={ctx}>
      {children}
    </FileContextState.Provider>
  );
};

export { FileContextProvider, useFileContextState };
