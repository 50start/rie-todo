import firebase from "firebase";
import { db } from "../servise/firebase";

//データをデータベースに追加
export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

//データをデータベースから取得 uid=> ログインしているユーザーのidだけ取ってくる
export const initGet = async (uid) => {
  //async awaitでdataを取ってくるまで待つ
  const todo = await db
    .collection("todo")
    .orderBy("createdAt", "desc")
    .where("uid", "==", uid); //自分のuserのidに一致するものだけ取ってくる
  return todo.get().then((snapshot) => {
    //snapshot => todoが一個づつという意味
    let todos = [];
    snapshot.forEach((doc) => {
      //配列を一個づつ回して新しい配列を作る
      todos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return todos; //新しい配列を作って呼び出し元に返す
  });
};

export const todoDelete = (id) => {
  //id=>todo.id
  db.collection("todo").doc(id).delete();
};

//dataを取得した後にそのdata（todo)を判断したいので　async関数にする　awaitを使いtodoがFirebaseから帰ってくるまで待つ
export const toggleComple = async (id) => {
  const todo = await db.collection("todo").doc(id).get(); //todoを取る
  return (
    //return => 更新が成功(promiseを返すことによって　TodoLIst.jsのcheckHandle関数のawaitが効いてくる
    db
      .collection("todo")
      .doc(id)
      .update({
        //もしチェックされたtodoが未完了　=> isCompleteをtrue
        //もしチェックされたtodoが完了　=> isCompleteをfalse(未完了に戻す)
        isComplete: todo.data().isComplete ? false : true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
  );
};
