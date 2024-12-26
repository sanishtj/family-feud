"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../../globals.css"; // Ensure this import is present to apply the custom styles

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL, {
  withCredentials: true,
});

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions", {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const unusedQuestions = data.filter((question) => !question.used);
        setQuestions(unusedQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handlePublish = (id) => {
    const questionToUpdate = questions.find((question) => question.id === id);
    questionToUpdate.used = true;

    fetch(`/api/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionToUpdate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
        socket.emit("publishQuestion", updatedQuestion);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <div className="container">
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="text-center text-black">{index + 1}</td>
                <td className="text-black">{question.question}</td>
                <td className="text-center">
                  <button
                    onClick={() => handlePublish(question.id)}
                    className="button"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
