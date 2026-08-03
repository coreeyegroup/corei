// src/App.tsx
import React from 'react';
import TopBar from './components/TopBar/TopBar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import Workspace from './components/Workspace/Workspace';
import RightSidebar from './components/RightSidebar/RightSidebar';
import BottomPanel from './components/BottomPanel/BottomPanel';
import StatusBar from './components/StatusBar/StatusBar';
import './styles/reset.css';
import './styles/variables.css';
import './styles/theme-dark.css';
import './styles/layout.css';

function App() {
  return (
    <div className="app-container">
      <TopBar />
      <div className="main-body">
        <div className="left-sidebar-wrapper">
          <LeftSidebar />
        </div>
        <div className="workspace-wrapper">
          <Workspace />
        </div>
        <div className="right-sidebar-wrapper">
          <RightSidebar />
        </div>
      </div>
      <div className="bottom-panel-wrapper">
        <BottomPanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
