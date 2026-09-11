import React from 'react';
import TopBar from '../topbar/TopBar';
import ActivityBar from '../activity/ActivityBar';
import Explorer from '../explorer/Explorer';
import Workspace from '../workspace/Workspace';
import RightPanel from '../panels/RightPanel';
import StatusBar from '../status/StatusBar';

const AppShell: React.FC = () => {
  return (
    <div className="corei-app">
      <TopBar />
      <div className="corei-body">
        <ActivityBar />
        <Explorer />
        <Workspace />
        <RightPanel />
      </div>
      <StatusBar />
    </div>
  );
};
export default AppShell;
