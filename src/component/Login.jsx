import React, { useState, useEffect } from "react";
import { auth } from "../servise/firebase";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    //認証が変わるたびにログイン、ログアウトが呼び出される user=> ログイン情報取得に成功したときに認証情報が入っているパラメーター
    //新しくユーザーがログインしようとした、ログアウトしようとしたなど、その時に毎回呼ばれるメソッド=>onAuthStateChanged
    const unSub = auth.onAuthStateChanged((user) => {
      user && history.push("/"); //何らかのuserが存在している時history.push！
    });
    return () => unSub();
  }, [history]);

  return (
    <div className="App">
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {/**isLoginがtrueの時は"Login"とタイトル表示*/}
      <br />
      <FormControl>
        <TextField
          name="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <br />
      <FormControl>
        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                //loginの場合
                try {
                  //例外処理を作る
                  await auth.signInWithEmailAndPassword(email, password);
                  history.push("/");
                } catch (error) {
                  alert(error.message);
                }
                //register(登録)の場合
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  history.push("/"); //成功したらルートパスに遷移
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "login" : "register"} {/**ボタンに表示される条件式 */}
      </Button>
      <br />
      <br />
      <Typography align="center">
        {/**Typography 適切なフォント種類を選び、美しく文字を配置すること*/}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account?" : "Back to login"}
        </span>
      </Typography>
    </div>
  );
};
