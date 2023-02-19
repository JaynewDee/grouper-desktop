import { FC, useState, memo, useMemo } from "react";
import "./App.css";
import Handlers from "./api";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";
import GroupsView from "./components/GroupsView";
import { Classes } from "./components/ClassList/ClassList";

import {
  View,
  StudentType,
  Files,
  ClassHandlers,
  DisplayControllers
} from "./Types";
import { StudentView } from "./components/StudentView";
import Navigation from "./components/Navigation/Navigation";

type GroupObject = { [key: number]: StudentType[] } | {};
const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [view, changeView] = useState<View>("students");

  const [students, setStudentData] = useState<StudentType[]>([]);

  const [groups, setGroupsData] = useState<GroupObject>();

  const [availableFiles, setAvailableFiles] = useState<Files>([]);
  const [toggleAll, setToggleAll] = useState("");

  const expandAll = () => setToggleAll("all");
  const collapseAll = () => setToggleAll("none");
  const clearContentDisplay = () => {
    setStudentData([]);
    setGroupsData({});
  };

  const stripExt = (opts: string[]) => opts.map((opt) => opt.split(".")[0]);

  const {
    handleGetFile,
    handleGetFileList,
    handleDeleteFile,
    handleBuildGroups
  } = Handlers;
  /////
  // Packaged handlers for single-prop send
  /////
  const classHandlers: ClassHandlers = {
    handleGetFile,
    handleDeleteFile,
    handleBuildGroups,
    fileOptions: stripExt(availableFiles)
  };

  const controls: DisplayControllers = {
    expandAll,
    collapseAll,
    clearContentDisplay
  };

  useMemo(() => {
    if (availableFiles.length === 0) {
      handleGetFileList({ setAvailableFiles });
    }
  }, []);

  const ViewSwitch = (view: View) => {
    const views = {
      students: (
        <StudentView
          studentData={students}
          controls={controls}
          toggleAll={toggleAll}
        />
      ),
      groups: <GroupsView groupsData={groups} />
    };
    return views[view] || <>No view here ...</>;
  };

  return (
    <>
      <Header isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Upload
        setStudentData={setStudentData}
        setAvailableFiles={setAvailableFiles}
        isLoggedIn={loggedIn}
      />
      <Navigation view={view} changeView={changeView} />
      <Classes
        handlers={classHandlers}
        controls={controls}
        handleBuildGroups={handleBuildGroups}
        setStudentData={setStudentData}
        setGroupsData={setGroupsData}
        setAvailableFiles={setAvailableFiles}
        changeView={changeView}
        isData={students.length}
      />
      {ViewSwitch(view)}
    </>
  );
};

export default memo(App);
