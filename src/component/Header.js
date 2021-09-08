import React, { useContext } from "react";
import dig from "object-dig";
import { logOut } from "../servise/firebase";
import { AuthContext } from "../providers/AuthProvider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: "space-between",
  },
  button: {
    color: "#fff",
  },
}));

export const Header = () => {
  //AuthContextで渡されている情報を取得
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">ReactToDo</Typography>
        {dig(currentUser, "currentUser", "uid") && (
          <Button className={classes.button} variant="inherit" onClick={logOut}>
            ログアウト
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
