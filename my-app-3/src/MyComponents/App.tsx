import './App.css';
import Header from './Header';
import Page from './Page';
import { createContext } from 'react';
import useItemCategory from '../hooks/ItemHooks';

export const ItemContext = createContext()

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
