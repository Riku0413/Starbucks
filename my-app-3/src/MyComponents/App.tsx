import './App.css';
import Header from './Header';
import Page from './Page';
import { createContext } from 'react';
import useItemCategory from '../hooks/ItemHooks';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const ItemContext = createContext()

import React from 'react';

function App() {
  return (
    <div className="App">
      <ItemContext.Provider value={useItemCategory()}>
        <Header/>
        <Page/>
      </ItemContext.Provider>
    </div>
  );
}

export default App;
