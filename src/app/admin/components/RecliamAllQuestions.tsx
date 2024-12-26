"use client";
import { useState } from "react";

export default function RecliamAllQuestions() {
  const [loading, setLoading] = useState(false);

  const handleResetGame = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/questions/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);

      // Optionally, you can refresh the questions list here
      window.location.reload();
    } catch (error) {
      console.error("Error resetting game:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleResetGame}
      className="button mb-4"
      style={{ backgroundColor: "#f44336", color: "white" }}
      disabled={loading}
    >
      {loading ? "Resetting..." : "Reset Game"}
    </button>
  );
}
