// src/components/TopRibbon/TopRibbon.tsx
import React from 'react';
import Row01 from './Row01';
import Row02 from './Row02';
import './TopRibbon.css';

const TopRibbon: React.FC = () => {

  return (
    <header className="top-ribbon">
      <Row01 />
      <Row02 />
    </header>
  );
};

export default TopRibbon;
