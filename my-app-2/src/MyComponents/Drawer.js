import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const drawer = (props) => {
  const { handleDrawerClose } = props;

  return (
  <div>
    <Toolbar sx={{ display: { sm: "none" } }}>
      <IconButton edge="start" color="inherit" aria-label="close" onClick={handleDrawerClose}>
        <CloseIcon />
      </IconButton>
    </Toolbar>

    <Divider />
    <List>
      {["Starbucks", "Doutor", "Tuully's", "Mac"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["GitHub", "Zenn", "Twitter"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
  );
};
