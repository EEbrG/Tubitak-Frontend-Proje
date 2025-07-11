"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    let users = [];

    try {
      const usersJSON = localStorage.getItem("users");
      users = usersJSON ? JSON.parse(usersJSON) : [];
    } catch (e) {
      console.error("Kullanıcı verisi okunamadı!", e);
      users = [];
    }

    if (!username || !password) {
      alert("Kullanıcı adı ve şifre girin!");
      return;
    }

    if (users.length === 0) {
      alert("Hiç kullanıcı yok, lütfen kayıt olun!");
      router.push("/kaydol");
      return;
    }

    const mevcut = users.find(
      (u) => u.username === username && u.password === password
    );

    if (mevcut) {
      setLoggedIn(true);
      router.push("/game");
    } else {
      alert("Kullanıcı adı veya şifre yanlış!");
    }
  };

  return (
    <div>
      <h1 className="baslik">🐄 🐄 FARM GAME 🐄 🐄</h1>
      <h2 className="baslik">Giriş Yap</h2>
      <div className="loginContainer">


      <input
        className="giris"
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      
      <br />
      <input
        className="giris"
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="btn" onClick={handleLogin}>Giriş Yap</button>
      <br />
      <button className="btn" onClick={() => router.push("/kaydol")}>Kayıt Ol</button>
      </div>
    </div>
  );
}
