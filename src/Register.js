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
            <div class="gender-Inner">
              <label>性別：</label>
              <div className="gender-Input_btn_area">
                <div className="gender-Input_btn">
                  <input name="man" type="radio" value={registerMan} onChange={(e) => setRegisterMan(e.target.value)}/>
                  <label>男性</label>
                </div>
                <div className="gender-Input_btn">
                  <input name="woman" type="radio" value={registerWoman} onChange={(e) => setRegisterWoman(e.target.value)}/>
                  <label>女性</label>
                </div>
              </div>
            </div>
            <div class="agreement-Inner">
              <div className="agreement-Input_btn">
                <input name="consent" type="checkbox" value={registerUsername}/>
                <p><Link to={"https://menherasenpai.notion.site/457df49475494671807673a0a3346451?pvs=25"}>利用規約</Link>に同意する</p>
              </div>
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