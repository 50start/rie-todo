import React, { useState, useEffect } from "react";
import { auth } from "../servise/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //ログイン情報を保持するProvider　currentUser=>ログインユーザー ログイン情報を入れる
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //ログイン情報が変わったタイミングでその情報をcurrentUserにセットする
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    //Contextを使用して認証に必要なコンポーネントを流し込む
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
