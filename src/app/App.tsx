import { FC, memo, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";
import GroupsView from "./components/GroupsView";
import { Classes } from "./components/ClassList/ClassList";
import { useFileContextState } from "./context/FileContext";
import { StudentView } from "./components/StudentView";
import Navigation from "./components/Navigation/Navigation";
import Toolbar from "./components/Toolbar/Toolbar";
import { useSettingsStore } from "./store/Store";
import { Window } from "./api";

//

const App: FC = () => {
  const { students, groups, view, adjustView } = useFileContextState();

  const [settings] = useSettingsStore();
  console.log(Window.get());
  console.log(settings);

  const ViewSwitch = (view: string): JSX.Element => {
    type Views = { [key: string]: JSX.Element };

    const views: Views = {
      students: <StudentView studentData={students} key={0} />,
      groups: <GroupsView groupsData={groups} key={1} />
    };

    return views[view] || <> No view here ... </>;
  };

  useEffect(() => {
    adjustView("students");
  }, []);

  return (
    <>
      <Header />
      <Upload />
      <Navigation view={view} />
      <Classes isData={students && students.length} />
      {view ? (
        ViewSwitch(view)
      ) : (
        <div className="content-box">
          <p>
            To begin building groups, upload some csv data, then select your
            file from the list.
          </p>
        </div>
      )}
      <Toolbar />
    </>
  );
};

export default memo(App);
