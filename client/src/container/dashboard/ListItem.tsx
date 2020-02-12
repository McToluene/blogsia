import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Compose" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);
