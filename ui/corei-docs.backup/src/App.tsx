import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DocumentViewer from './components/doc/DocumentViewer';
import SearchResults from './pages/SearchResults';
import { useEffect } from 'react';
import { buildSearchIndex } from './lib/search-index';

function App() {
  useEffect(() => {
    fetch('/data/search-index.json')
      .then(res => res.json())
      .then(docs => {
        buildSearchIndex(docs);
      })
      .catch(() => {
        console.warn('Search index not found; search will be limited.');
      });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage-:stage/phase-:phase/step-:step" element={<DocumentViewer />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Layout>
  );
}

export default App;
