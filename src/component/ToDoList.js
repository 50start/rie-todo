import React from "react";
import { todoDelete, toggleComple } from "../servise/api";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { ListItemIcon } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 360,
    margin: "auto",
  },
  ul: {
    paddingLeft: 0,
    listStyle: "none",
  },
  list: {
    justifyContent: "space-between",
  },
}));

//Dashboard.jsから与えらえれたデータを受け取る
export const ToDoList = (props) => {
  const deleteHandle = async (id) => {
    await todoDelete(id);
    props.fetch(); //Dashboardコンポーネントから
  };

  const checkHandle = async (id) => {
    //id => どのtodoを押したのか　Api経由でisCompleteの値を更新
    await toggleComple(id); //awaitでデーターベースの取得を待つ
    props.fetch(); //更新したらデータをリフレッシュ　一新
  };

  const classes = useStyles();

  const todoList = props.todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <ListItemIcon>
          <Checkbox
            checked={todo.isComplete}
            onChange={() => checkHandle(todo.id)} //チェックボックスの値が変わったときにcheckHandle関数が呼び出される
          />
        </ListItemIcon>
        <ListItemText primary={todo.content} /> {/*表示したいcontent */}
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteHandle(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <h3>TODOLIST</h3>
      <ul className={classes.ul}>{todoList}</ul>
    </div>
  );
};
