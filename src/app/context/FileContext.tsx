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
  files: string[];
  activeFile: string;
  students: StudentType[];
  groups: GroupsObject;
  groupAvgs: AvgsObject;
  view: string;
  setFiles: () => void;
  setActiveFile: (file: string) => void;
  submitFile: (file: File) => void;
  deleteFile: (text: string) => void;
  adjustView: (newView: string) => void;
  getData: (text: string, groupSize: number) => void;
}

type AvgsObject = { [key: number]: number } | {};

const FileContextState = createContext<ContextState | any>({});

const FileContextProvider = ({ children }: any) => {
  const [files, setAvailableFiles] = useState<Files>([]);
  const [activeFile, setCurrentFile] = useState("");

  const [students, setStudentData] = useState<StudentType[]>([]);
  const [groups, setGroupsData] = useState<GroupsObject>({});


  const [view, setView] = useState<string>("students");

  const groupAvgs: AvgsObject = useMemo(() => {
    const avgsStruct = Object.values(groups).reduce(
      (acc: AvgsObject, v: StudentType[], idx: number) => ({
        ...acc,
        [idx + 1]: (
          v.reduce(
            (acc: number, student: StudentType) => acc + student.avg,
            0
          ) / v.length
        ).toFixed(2)
      }),
      {}
    );
    return avgsStruct
  }, [groups])

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
    async (file: File) => {
      const objName = file["name"].split(".")[0];
      setActiveFile(objName);

      const jsonString = await fileToString(file);
      await Invokers.uploadObject(jsonString, objName, false);

      const filenames = await Invokers.getFileList();
      setAvailableFiles(filenames);
    },
    [setAvailableFiles]
  );

  const deleteFile = useCallback(
    async (text: string) => {
      const objName = text + ".json";
      if (activeFile === objName && files.length) {
        setActiveFile(files[0]);
      }
      await Invokers.deleteFile(objName);
      setFiles();
    },
    [setFiles]
  );

  const getData = useCallback(
    async (text: string, groupSize: number) => {
      setGroupsData({});
      const objName = text + ".json";
      setActiveFile(text);

      const res = await Invokers.buildGroups(objName, groupSize);
      const students = JSON.parse(res[0]);
      const groups = JSON.parse(res[1]);

      setStudentData(students);
      setGroupsData(groups);

      setView("students");
    },
    [setStudentData, setGroupsData, setView]
  );

  const sendForGroups = useCallback(
    async (text: string, groupSize: number) => {
      if (students.length === 0) {
        setGroupsData({});
        const objName = text + ".json";
        setActiveFile(text);

        const res = await Invokers.buildGroups(objName, groupSize);
        const students = JSON.parse(res[0]);
        const groups = JSON.parse(res[1]);

        setStudentData(students);
        setGroupsData(groups);
      } else {
        const studentsJson = JSON.stringify(students);

        const groupsJson = await Invokers.groupsFromData(
          studentsJson,
          Number(groupSize)
        );

        const parsed = JSON.parse(groupsJson);

        setGroupsData(parsed);
      }

      setView("groups");
    },
    [setGroupsData, setStudentData, setActiveFile, setView]
  );

  const ctx = useMemo(
    () => ({
      files,
      activeFile,
      students,
      groups,
      groupAvgs,
      view,
      setFiles,
      setActiveFile,
      submitFile,
      adjustView,
      deleteFile,
      getData,
      sendForGroups
    }),
    [
      files,
      activeFile,
      students,
      groups,
      groupAvgs,
      view,
      setFiles,
      setCurrentFile,
      submitFile,
      adjustView,
      deleteFile,
      getData,
      sendForGroups
    ]
  );

  return (
    <FileContextState.Provider value={ctx}>
      {children}
    </FileContextState.Provider>
  );
};

const useFileContextState = () => {
  const context = useContext(FileContextState);

  if (context === undefined) {
    throw new Error("useFileContextState was used outside of its Provider");
  }

  return context;
};

export { FileContextProvider, useFileContextState };
