import React from "react";
import "./Todo.css";
import { List, ListItem, ListItemText } from "@material-ui/core";

function Todo(props) {
  return (
    <List className="todo_list">
      <ListItem>
        <ListItemText primary={props.text} secondary="todo" />
      </ListItem>
      {/* <li>{props.text}</li> */}
    </List>
  );
}

export default Todo;
