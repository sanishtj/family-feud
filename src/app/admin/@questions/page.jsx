import "../../globals.css";
import Questions from "../components/Questions";
import RecliamAllQuestions from "../components/RecliamAllQuestions";

export default function QuestionsPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <RecliamAllQuestions />
      <Questions />
    </div>
  );
}
