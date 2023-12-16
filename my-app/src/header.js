import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{bgcolor: 'white'}}>
        <Toolbar variant="dense">
          <img src="/logo_3.jpg" alt="Logo" style={{ width: '120px', height: '30px' }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}