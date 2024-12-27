import "../game.css";
import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <>
      <div className="header">
        <div className="tilted-text">Sanish's</div>
        <img
          src="/Family-Feud-Logo.png"
          alt="Family Feud Logo"
          className="tilted-logo"
        />
      </div>
      <GameBoard />
    </>
  );
}
