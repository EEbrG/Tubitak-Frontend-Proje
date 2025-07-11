"use client";
import { useGame } from "../context/GameContext";
import { useRouter } from "next/navigation";

export default function StorePage() {
  const router = useRouter();
  const { balance, setBalance, setSelectedPlant } = useGame();

const buySeed = () => {
  if (balance < 10) {
    alert("Yetersiz bakiye!");
    return;
  }
  setBalance(balance - 10);
  setSelectedPlant("tohum");
router.push("/game");
};
  const buyMilk = () => {
    if (balance < 20) {
      alert("Yetersiz bakiye!");
      return;
    }
    setBalance(balance - 20);
    setSelectedPlant("süt");
    alert("Süt seçildi! Oyuna dönüyorsunuz.");
    router.push("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mağaza</h1>
      <p>Bakiye: {balance}₺</p>
      <button onClick={buySeed}>🌱 Tohum Satın Al (10₺)</button>
      <br />
      <button onClick={buyMilk}>🥛 Süt Satın Al (20₺)</button>
      <br />
      <button onClick={() => router.push("/game")}>Oyuna Dön</button>
    </div>
  );
}
