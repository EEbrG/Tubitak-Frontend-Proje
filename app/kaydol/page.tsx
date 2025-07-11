"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Kaydol() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!username || !password) {
      alert("Kullanıcı adı ve şifre girin!");
      return;
    }
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    
    const mevcut = users.find((u) => u.username === username);
    if (mevcut) {
      alert("Bu kullanıcı adı zaten kayıtlı!");
      return;
    }

  
    const yeniKullanici = { username, password };
    const yeniUsers = [...users, yeniKullanici];

    localStorage.setItem("users", JSON.stringify(yeniUsers));

    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
    router.push("/");
  };

  return (
    <div className="loginWrapper">
      <h1 className="baslik"> 🐄 🐄 Kayıt Ol 🐄 🐄 </h1>
      <div className="loginContainer">
      <input
        className="giris"
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /></div>
      <br />
      <input
        className="giris"
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="btn" onClick={handleRegister}>Kaydol</button>
    </div>
  );
}
