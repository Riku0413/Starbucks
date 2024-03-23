import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BasicTabs from "./Tabs";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";

// const drawerWidth = 240;

export default function Header({ handleDrawerToggle, drawerWidth, tabsData }) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [isClosing, setIsClosing] = React.useState(false);

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          bgcolor: "white",
          height: "108px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar variant="dense" sx={{ marginBottom: "12px" }}>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mt: "15px", display: { sm: "none" }}}
          >
            <MenuIcon />
          </IconButton>
          <a
            href="https://www.starbucks.co.jp/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "15px" }}
          >
            <img
              src="/logo_3.jpg"
              alt="Logo"
              style={{ width: "160px", height: "40px" }}
            />
          </a>
        </Toolbar>
        <BasicTabs tabsData={tabsData}/>
      </AppBar>
      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box> */}
    </Box>
  );
}
