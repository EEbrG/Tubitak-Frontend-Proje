import "./globals.css";
import { GameProvider } from "./context/GameContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
