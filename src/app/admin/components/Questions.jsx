"use client"
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL,{withCredentials: true,});

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`)
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
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
    <div className="container mx-auto p-4">
      <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-black">#</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-black">Question</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
                <td className="py-2 px-4 border-b text-center text-black">{index + 1}</td>
                <td className="py-2 px-4 border-b text-black">{question.question}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handlePublish(question.id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
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