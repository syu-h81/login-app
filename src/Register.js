import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerBorn, setRegisterBorn] = useState("");
  const [registerMan, setRegisterMan] = useState("");
  const [registerWoman, setRegisterWoman] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerUsername,
        registerEmail,
        registerPassword,
        //registerBorn,
        //registerMan,
        //registerWoman
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };

  const [user, setUser] = useState("");

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>ユーザー名</label>
              <input name="username" type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)}/>
            </div>
            <div>
              <label>メールアドレス</label>
              <input name="email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
            </div>
            <div>
              <label>パスワード</label>
              <input name="password" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
            </div>
            <div>
              <label>生年月日</label>
              <input name="date" type="date" value={registerBorn} onChange={(e) => setRegisterBorn(e.target.value)}/>
            </div>
            <div>
              <label>性別</label>
              <input name="man" type="radio" value={registerMan} onChange={(e) => setRegisterMan(e.target.value)}/>
              <input name="woman" type="radio" value={registerWoman} onChange={(e) => setRegisterWoman(e.target.value)}/>
            </div>
            <div>
              <label>利用規約への同意</label>
              <p>同意する</p>
              <input name="consent" type="checkbox" value={registerUsername}/>
            </div>
            <button>登録する</button>
            <p>ログインは<Link to={`/login/`}>こちら</Link></p>
          </form>
        </>
      )}
    </>
  );
};

export default Register;