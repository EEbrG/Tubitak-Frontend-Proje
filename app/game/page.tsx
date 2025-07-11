"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "../context/GameContext";

export default function GamePage() {
  const router = useRouter();
  const {
    balance,
    setBalance,
    selectedPlant,
    setSelectedPlant,
  } = useGame();

  const [kutucuk, setKutucuk] = useState<string[]>(Array(16).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const timeoutsRef = useRef<(NodeJS.Timeout | null)[]>(Array(16).fill(null));

  const stageEmoji: Record<string, string> = {
    "": "",
    T: "🌱",
    F: "🌿",
    B: "🌾",
    Ç: "🌸",
    K: "🥀",
    H: "❤️",
    U: "🍼",
    C: "🐄",
    I: "🥛",
    X: "💀",
  };

  useEffect(() => {
    const hepsiBos = kutucuk.every((k) => k === "");
    if (hepsiBos && balance < 10) {
      setGameOver(true);
    }
  }, [kutucuk, balance]);

  const handleRestart = () => {
    setBalance(100);
    setKutucuk(Array(16).fill(""));
    setGameOver(false);
    setSelectedPlant(null);

    timeoutsRef.current.forEach((timeout) => {
      if (timeout) clearTimeout(timeout);
    });
    timeoutsRef.current = Array(16).fill(null);
  };

  const handleLogout = () => {
    handleRestart();
    router.push("/");
  };

  const handleClick = (index: number) => {
    if (gameOver) return;

    const current = kutucuk[index];

    // Hasat
    if (current === "Ç") {
      setKutucuk((prev) => {
        const newGrid = [...prev];
        newGrid[index] = "";
        return newGrid;
      });
      setBalance((b) => b + 20);
      if (timeoutsRef.current[index]) clearTimeout(timeoutsRef.current[index]!);
      return;
    }
    if (current === "I") {
      setKutucuk((prev) => {
        const newGrid = [...prev];
        newGrid[index] = "";
        return newGrid;
      });
      setBalance((b) => b + 40);
      if (timeoutsRef.current[index]) clearTimeout(timeoutsRef.current[index]!);
      return;
    }
    // Boşaltma
    if (["K", "X", "T", "F", "B", "H", "U", "C"].includes(current)) {
      setKutucuk((prev) => {
        const newGrid = [...prev];
        newGrid[index] = "";
        return newGrid;
      });
      if (timeoutsRef.current[index]) clearTimeout(timeoutsRef.current[index]!);
      return;
    }

    // Ekim
    if (current === "") {
      if (!selectedPlant) {
        alert("Lütfen Store'dan bir ürün seçin!");
        return;
      }

      if (selectedPlant === "tohum") {
        if (balance < 10) {
          alert("Yetersiz bakiye!");
          return;
        }
        setBalance((b) => b - 10);
        setSelectedPlant(null);
        setKutucuk((prev) => {
          const newGrid = [...prev];
          newGrid[index] = "T";
          return newGrid;
        });

        const fidanTimeout = setTimeout(() => {
          setKutucuk((prev) => {
            const newGrid = [...prev];
            if (newGrid[index] === "T") newGrid[index] = "F";
            return newGrid;
          });

          const bitkiTimeout = setTimeout(() => {
            setKutucuk((prev) => {
              const newGrid = [...prev];
              if (newGrid[index] === "F") newGrid[index] = "B";
              return newGrid;
            });

            const cicekTimeout = setTimeout(() => {
              setKutucuk((prev) => {
                const newGrid = [...prev];
                if (newGrid[index] === "B") newGrid[index] = "Ç";
                return newGrid;
              });

              const kurumTimeout = setTimeout(() => {
                setKutucuk((prev) => {
                  const newGrid = [...prev];
                  if (newGrid[index] === "Ç") newGrid[index] = "K";
                  return newGrid;
                });
              }, 4000);
              timeoutsRef.current[index] = kurumTimeout;
            }, 2000);
            timeoutsRef.current[index] = cicekTimeout;
          }, 2000);
          timeoutsRef.current[index] = bitkiTimeout;
        }, 2000);
        timeoutsRef.current[index] = fidanTimeout;
      }

      if (selectedPlant === "süt") {
        if (balance < 20) {
          alert("Yetersiz bakiye!");
          return;
        }
        setBalance((b) => b - 20);
        setSelectedPlant(null);
        setKutucuk((prev) => {
          const newGrid = [...prev];
          newGrid[index] = "H";
          return newGrid;
        });

        const calfTimeout = setTimeout(() => {
          setKutucuk((prev) => {
            const newGrid = [...prev];
            if (newGrid[index] === "H") newGrid[index] = "U";
            return newGrid;
          });

          const cowTimeout = setTimeout(() => {
            setKutucuk((prev) => {
              const newGrid = [...prev];
              if (newGrid[index] === "U") newGrid[index] = "C";
              return newGrid;
            });

            const milkTimeout = setTimeout(() => {
              setKutucuk((prev) => {
                const newGrid = [...prev];
                if (newGrid[index] === "C") newGrid[index] = "I";
                return newGrid;
              });

              const rottenTimeout = setTimeout(() => {
                setKutucuk((prev) => {
                  const newGrid = [...prev];
                  if (newGrid[index] === "I") newGrid[index] = "X";
                  return newGrid;
                });
              }, 4000);
              timeoutsRef.current[index] = rottenTimeout;
            }, 2000);
            timeoutsRef.current[index] = milkTimeout;
          }, 2000);
          timeoutsRef.current[index] = cowTimeout;
        }, 2000);
        timeoutsRef.current[index] = calfTimeout;
      }
    }
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 className="baslik">💀💀GAME OVER💀💀</h1>
        <button className="btn" onClick={handleRestart}>
          Yeniden Başla
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="LoginWrapper">
        <h1 className="baslik">🐄 🐄 FARM GAME 🐄 🐄</h1>
        <p className="giris">Bakiye: {balance}₺</p>
      </div>
      <div className="oyunAlani">
        <div className="kutucuk">
          {kutucuk.map((tarlacik, index) => (
            <div
              key={index}
              className="tarlacik"
              onClick={() => handleClick(index)}
            >
              {stageEmoji[tarlacik]}
            </div>
          ))}
        </div>
        <div className="btn2">
          <button className="btn" onClick={handleLogout}>
            Çıkış Yap
          </button>
          <button className="btn" onClick={handleRestart}>
            Restart
          </button>
          <button
            className="btn"
            onClick={() => router.push("/store")}
          >
            Store
          </button>
        </div>
      </div>
    </>
  );
}
