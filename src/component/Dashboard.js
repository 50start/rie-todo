import React, { useState, useEffect, useContext } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { Login } from "./Login";
import { addTodo, initGet } from "../servise/api";
import { ToDoList } from "./ToDoList";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: 40,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    margin: "auto",
    marginBottom: 40,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  input: {
    marginRight: 10,
  },
}));

export const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  //複数のデーターが取得が予測されるので初期値は配列にする
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //todo一覧を取得
    fetch();
  }, [currentUser]);
  //useContextのcurrentUserは最初にアクセスした時は取れない　最初の画面を表示される前currentUserは取れていない
  //currentUserが取れる前にfetchを走らすとuidが取れないとエラーが出る　uidが取れたらfecthを走らせる(firestoreにデータを取りに行く)
  const fetch = async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      const data = await initGet(currentUser.currentUser.uid);
      await setTodos(data);
      console.log(data);
      //fetchを呼び出した時は非同期
      // const todosに値が帰ってからsetTodosする
    }
  };

  const post = async () => {
    //todoリストテキスト入力
    //addTodoでテキストを追加して、
    //setInputNameで空にしてから
    //fetchで最新のデーター、todo一覧を取得
    await addTodo(inputName, currentUser.currentUser.uid);
    await setInputName("");
    fetch();
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {dig(currentUser, "currentUser", "uid") ? (
        //もしログインしていたらTODO入力フォーム
        <form className={classes.form}>
          <TextField
            className={classes.input}
            placeholder="TodoName"
            text="name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Button
            type="button"
            variant="contained" //文字を入力するとボタンに色を塗りつぶす
            color="primary"
            size="small"
            onClick={() => post()}
            disabled={inputName.length > 0 ? false : true}
            //disabled 押せるボタンなのか判断　0以上なら押せる　0以下ならdisabledがtrueになる
          >
            追加
          </Button>
        </form>
      ) : (
        //もしログインしていない場合はログインボタン
        <Login />
      )}
      <ToDoList todos={todos} fetch={fetch} />
    </div>
  );
};
