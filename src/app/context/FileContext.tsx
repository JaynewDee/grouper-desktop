import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";
import { Invokers } from "../api";
import { Files, GroupObject, StudentType, View } from "../Types";

interface ContextState {
  files?: string[];
  activeFile?: string;
  students?: StudentType[];
  groups?: GroupObject;
  setFiles?: any;
  setActiveFile?: any;
  setStudents?: any;
  setGroups?: any;
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
  const [view, setView] = useState<View>();

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
    console.log(activeFile);
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

  const ctx = useMemo(
    () => ({
      files,
      activeFile,
      students,
      groups,
      setFiles,
      setActiveFile,
      setStudents,
      setGroups
    }),
    [
      files,
      activeFile,
      students,
      groups,
      setFiles,
      setCurrentFile,
      setStudents,
      setGroups
    ]
  );

  return (
    <FileContextState.Provider value={ctx}>
      {children}
    </FileContextState.Provider>
  );
};

export { FileContextProvider, useFileContextState };
