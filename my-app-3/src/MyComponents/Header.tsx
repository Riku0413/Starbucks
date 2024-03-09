import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// @ts-expect-error TS(6142): Module './Tabs' was resolved to '/Users/kobayashir... Remove this comment to see the full error message
import BasicTabs from './Tabs';

export default function Header() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{ flexGrow: 1 }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white', height: '108px'}}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Toolbar variant="dense" sx={{marginBottom: '12px'}}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a href="https://www.starbucks.co.jp/index.html" target="_blank" rel="noopener noreferrer" style={{marginTop: '15px'}}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src="/logo_3.jpg" alt="Logo" style={{ width: '160px', height: '40px' }} />
          </a>
        </Toolbar>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BasicTabs/>
      </AppBar>
    </Box>
  );
}