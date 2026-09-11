// src/App.tsx
import { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import TopRibbon from './components/TopRibbon/TopRibbon';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import Workspace from './components/Workspace/Workspace';
import RightSidebar from './components/RightSidebar/RightSidebar';
import BottomPanel from './components/BottomPanel/BottomPanel';
import StatusBar from './components/StatusBar/StatusBar';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import { startTradePolling } from './services/tradeService';
import { startMarketPolling } from './services/marketDataService';
import './styles/reset.css';
import './styles/variables.css';
import './styles/theme-dark.css';
import './styles/layout.css';

function App() {
  const { openTab } = useAppStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabId = params.get('tab');
    if (tabId) {
      openTab(tabId);
    }
  }, [openTab]);

  useEffect(() => {
    startTradePolling(10000);
    startMarketPolling(2000);
  }, []);

  // Check for Standalone Mode
  const isStandalone = new URLSearchParams(window.location.search).get('standalone') === 'true';

  if (isStandalone) {
    return (
      <div className="app-container standalone-mode">
        <Workspace standalone={true} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <TopRibbon />
      <KeyboardShortcutsHelp />
      <div className="main-body">
        <div className="left-sidebar-wrapper"><LeftSidebar /></div>
        <div className="workspace-wrapper"><Workspace /></div>
        <div className="right-sidebar-wrapper"><RightSidebar /></div>
      </div>
      <div className="bottom-panel-wrapper"><BottomPanel /></div>
      <StatusBar />
    </div>
  );
}

export default App;
