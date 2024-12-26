"use client";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../../globals.css";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL, {
  withCredentials: true,
});

export default function GameBoard({ isAdmin }) {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [showCross, setShowCross] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const wrongAnswerAudioRef = useRef(null);
  const correctAnswerAudioRef = useRef(null);

  useEffect(() => {
    socket.on("publishQuestion", (question) => {
      setQuestion(question);
      setAnswers([]);
      setAnswerIndex(null);
      setScore(0);
      setTeam1Score(0);
      setTeam2Score(0);
    });

    socket.on("revealAnswer", (answerIndex) => {
      setAnswerIndex(answerIndex);
      setAnswers((prevAnswers) => {
        return [...prevAnswers, answerIndex];
      });
    });

    socket.on("awardPoints", (teamScore) => {
      if (teamScore.team === 1) {
        setTeam1Score((prevScore) => prevScore + teamScore.score);
      } else if (teamScore.team === 2) {
        setTeam2Score((prevScore) => prevScore + teamScore.score);
      }
      setScore(0);
      if (soundEnabled && correctAnswerAudioRef.current) {
        correctAnswerAudioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    });

    socket.on("wrongAnswer", () => {
      setShowCross(true);
      if (soundEnabled && wrongAnswerAudioRef.current) {
        wrongAnswerAudioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setTimeout(() => {
        setShowCross(false);
      }, 5000);
    });

    return () => {
      socket.off("publishQuestion");
      socket.off("revealAnswer");
      socket.off("awardPoints");
      socket.off("wrongAnswer");
    };
  }, [soundEnabled]);

  useEffect(() => {
    if (question && answers.length > 0) {
      setScore(question.answers[answerIndex].points);
    }
  }, [answers]);

  return (
    <div className="gameBoard">
      {showCross && !isAdmin && (
        <div className="overlay visible">
          <img src="/cross.png" alt="Wrong Answer" className="cross-image" />
        </div>
      )}
      <audio ref={wrongAnswerAudioRef} src="/wrong-answer.mp3" />
      <audio ref={correctAnswerAudioRef} src="/correct-answer.mp3" />
      <div className="score" id="boardScore">
        {score}
      </div>
      <div className="score" id="team1">
        {team1Score}
      </div>
      <div className="score" id="team2">
        {team2Score}
      </div>
      {/*- Question -*/}
      <div className="questionHolder">
        <span className="question">
          {question ? question.question : "Waiting for question..."}
        </span>
      </div>
      {/*- Answers -*/}
      <div className="colHolder">
        <div className="col1">
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 0);
                }
              }}
              className="card"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(0)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[0] && question.answers[0].answer
                    ? question.answers[0].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[0] && question.answers[0].answer
                    ? question.answers[0].points
                    : "..."}
                </b>
              </div>
            </div>
          </div>
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              className="card"
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 1);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(1)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[1] && question.answers[1].answer
                    ? question.answers[1].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[1] && question.answers[1].answer
                    ? question.answers[1].points
                    : "..."}
                </b>
              </div>
            </div>
          </div>
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              className="card"
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 2);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(2)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[2] && question.answers[2].answer
                    ? question.answers[2].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[2] && question.answers[2].answer
                    ? question.answers[2].points
                    : "..."}
                </b>
              </div>
            </div>
          </div>
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              className="card"
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 3);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(3)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[3] && question.answers[3].answer
                    ? question.answers[3].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[3] && question.answers[3].answer
                    ? question.answers[3].points
                    : "..."}
                </b>
              </div>
            </div>
          </div>
        </div>
        <div className="col2">
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              className="card"
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 4);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(4)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[4] && question.answers[4].answer
                    ? question.answers[4].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[4] && question.answers[4].answer
                    ? question.answers[4].points
                    : "..."}
                </b>
              </div>
            </div>
          </div>
          <div className="cardHolder" style={{ perspective: 800 }}>
            <div
              className="card"
              onClick={() => {
                if (isAdmin) {
                  socket.emit("revealAnswer", 5);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isAdmin || answers.includes(5)
                    ? "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
                    : null,
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
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="fit-text">
                  {question && question.answers[5] && question.answers[5].answer
                    ? question.answers[5].answer
                    : "..."}
                </span>
                <b className="LBG">
                  {question && question.answers[5] && question.answers[5].answer
                    ? question.answers[5].points
                    : "..."}
                </b>
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
      {isAdmin && (
        <div className="btnHolder">
          <div
            id="awardTeam1"
            data-team={1}
            className="button"
            onClick={() => {
              socket.emit("awardPoints", { team: 1, score: score });
            }}
          >
            Award Team 1
          </div>
          <div
            id="reset"
            className="button"
            onClick={() => {
              socket.emit("publishQuestion", null);
            }}
          >
            Reset
          </div>
          <div
            id="reset"
            className="button"
            onClick={() => {
              socket.emit("wrongAnswer", null);
            }}
          >
            Wrong Answer
          </div>
          <div
            id="awardTeam2"
            data-team={2}
            className="button"
            onClick={() => {
              socket.emit("awardPoints", { team: 2, score: score });
            }}
          >
            Award Team 2
          </div>
        </div>
      )}
      {!soundEnabled && (
        <button onClick={() => setSoundEnabled(true)} className="button">
          Enable Sound
        </button>
      )}
    </div>
  );
}
