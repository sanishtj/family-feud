import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div className="instructions-page">
      <div className="header">
        <div className="tilted-text">Sanish's</div>
        <img
          src="/Family-Feud-Logo.png"
          alt="Family Feud Logo"
          className="tilted-logo"
        />
      </div>
      <h1>Family Feud Game Instructions</h1>
      <ul>
        <li>
          Teams: There are 4 teams. The first 2 teams (Team 1 on the left, Team
          2 on the right) will play first, followed by the other 2 teams.
        </li>
        <li>
          Coin Toss: Flip a coin before each question. Team 1 is "Heads," Team 2
          is "Tails." The winner answers first.
        </li>
        <li>
          Answering Questions: Teams take turns guessing the top 6 answers. Each
          team has 4-5 chances to guess.
        </li>
        <li>
          Time Limit: Each team has 45 seconds to answer. If they can't, the
          other team gets a chance.
        </li>
        <li>
          Winning: The team with the most correct answers after 5 questions wins
          the match and gets a lot of claps! 🎉
        </li>
      </ul>
    </div>
  );
}
