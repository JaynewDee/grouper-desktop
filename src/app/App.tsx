import { FC, useState, memo, useMemo } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";
import GroupsView from "./components/GroupsView";
import { Classes } from "./components/ClassList/ClassList";
import { FileContextProvider } from "./context/FileContext";
import {
  View,
  StudentType,
  Files,
  ClassHandlers,
  DisplayControllers,
  GroupObject
} from "./Types";
import { StudentView } from "./components/StudentView";
import Navigation from "./components/Navigation/Navigation";

const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [view, changeView] = useState<View>("students");

  const [students, setStudentData] = useState<StudentType[]>([]);

  const [groups, setGroupsData] = useState<GroupObject>({});

  const [availableFiles, setAvailableFiles] = useState<Files>([]);

  const [toggleAll, setToggleAll] = useState("");

  const expandAll = () => setToggleAll("all");
  const collapseAll = () => setToggleAll("none");
  const clearContentDisplay = () => {
    setStudentData([]);
    setGroupsData({});
  };

  const stripExt = (opts: string[]) => opts.map((opt) => opt.split(".")[0]);

  const ViewSwitch = (view: View) => {
    const views = {
      students: <StudentView studentData={students} toggleAll={toggleAll} />,
      groups: <GroupsView groupsData={groups} />
    };
    return views[view] || <> No view here ... </>;
  };

  return (
    <>
      <FileContextProvider>
        <Header isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Upload
          setStudentData={setStudentData}
          setAvailableFiles={setAvailableFiles}
          isLoggedIn={loggedIn}
        />
        <Navigation view={view} changeView={changeView} />
        <Classes
          setStudentData={setStudentData}
          setGroupsData={setGroupsData}
          setAvailableFiles={setAvailableFiles}
          changeView={changeView}
          isData={students.length}
        />
        {ViewSwitch(view)}
      </FileContextProvider>
    </>
  );
};

export default memo(App);
