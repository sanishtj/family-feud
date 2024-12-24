import "../game.css";

export default function App() {
  return <div className="gameBoard">
  {/*- Scores -*/}
  <div className="score" id="boardScore">
    0
  </div>
  <div className="score" id="team1">
   0
  </div>
  <div className="score" id="team2">
   0
  </div>
  {/*- Question -*/}
  <div className="questionHolder">
    <span className="question">Name a prestigious occupation</span>
  </div>
  {/*- Answers -*/}
  <div className="colHolder">
    <div className="col1">
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">1</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>Physician</span>
            <b className="LBG">43</b>
          </div>
        </div>
      </div>
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">2</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>Lawyer</span>
            <b className="LBG">22</b>
          </div>
        </div>
      </div>
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">3</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>President</span>
            <b className="LBG">7</b>
          </div>
        </div>
      </div>
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">4</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>Banker</span>
            <b className="LBG">3</b>
          </div>
        </div>
      </div>
    </div>
    <div className="col2">
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">5</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>Pilot</span>
            <b className="LBG">2</b>
          </div>
        </div>
      </div>
      <div className="cardHolder" style={{ perspective: 800 }}>
        <div
          className="card"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
          }}
        >
          <div className="front" style={{ backfaceVisibility: "hidden" }}>
            <span className="DBG">6</span>
          </div>
          <div
            className="back DBG"
            style={{
              transform:
                "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
              backfaceVisibility: "hidden"
            }}
          >
            <span>Politician</span>
            <b className="LBG">2</b>
          </div>
        </div>
      </div>
      <div className="cardHolder empty" style={{ perspective: 800 }}>
        <div />
      </div>
      <div className="cardHolder empty" style={{ perspective: 800 }}>
        <div />
      </div>
    </div>
  </div>
  {/*- Buttons -*/}
  <div className="btnHolder">
    <div id="awardTeam1" data-team={1} className="button">
      Award Team 1
    </div>
    <div id="newQuestion" className="button">
      New Question
    </div>
    <div id="awardTeam2" data-team={2} className="button">
      Award Team 2
    </div>
  </div>
</div>

}
