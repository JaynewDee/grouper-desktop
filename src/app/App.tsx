import { FC, useState, memo, useMemo } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";
import GroupsView from "./components/GroupsView";
import { Classes } from "./components/ClassList/ClassList";
import {
  FileContextProvider,
  useFileContextState
} from "./context/FileContext";

import { StudentView } from "./components/StudentView";
import Navigation from "./components/Navigation/Navigation";

const App: FC = () => {
  const { students, groups, view, setView } = useFileContextState();

  const ViewSwitch = (view: string): JSX.Element => {
    type Views = { [key: string]: JSX.Element };

    const views: Views = {
      students: <StudentView studentData={students} />,
      groups: <GroupsView groupsData={groups} />
    };

    return views[view] || <> No view here ... </>;
  };

  return (
    <>
      <FileContextProvider>
        <Header />
        <Upload />
        <Navigation view={view} setView={setView} />
        <Classes isData={students && students.length} />
        {view ? ViewSwitch(view) : null}
      </FileContextProvider>
    </>
  );
};

export default memo(App);
