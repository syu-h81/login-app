import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { useNavigate, Navigate } from "react-router-dom";

const Mypage = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  /* ログアウト実装 */
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{auth.currentUser.displayName}</p>
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;