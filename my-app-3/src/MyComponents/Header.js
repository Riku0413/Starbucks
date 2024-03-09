import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BasicTabs from './Tabs';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white', height: '108px'}}>
        <Toolbar variant="dense" sx={{marginBottom: '12px'}}>
          <a href="https://www.starbucks.co.jp/index.html" target="_blank" rel="noopener noreferrer" style={{marginTop: '15px'}}>
            <img src="/logo_3.jpg" alt="Logo" style={{ width: '160px', height: '40px' }} />
          </a>
        </Toolbar>
        <BasicTabs/>
      </AppBar>
    </Box>
  );
}