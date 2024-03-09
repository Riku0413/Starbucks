import './App.css';
// @ts-expect-error TS(6142): Module './Header' was resolved to '/Users/kobayash... Remove this comment to see the full error message
import Header from './Header';
// @ts-expect-error TS(6142): Module './Page' was resolved to '/Users/kobayashir... Remove this comment to see the full error message
import Page from './Page';
import { createContext } from 'react';
import useItemCategory from '../hooks/ItemHooks';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const ItemContext = createContext()

function App() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="App">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ItemContext.Provider value={useItemCategory()}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header/>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Page/>
      </ItemContext.Provider>
    </div>
  );
}

export default App;
