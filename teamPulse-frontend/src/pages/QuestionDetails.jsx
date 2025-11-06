import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  const fetchData = async () => {
    const qRes = await API.get(`/questions/${id}`);
    setQuestion(qRes.data);
    const aRes = await API.get(`/answers/${id}`);
    setAnswers(aRes.data);
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleAnswer = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/answers/${id}`, { text: newAnswer });
      setNewAnswer("");
      toast.success("Answer added");
      fetchData();
    } catch {
      toast.error("Error adding answer");
    }
  };

  if (!question) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">{question.title}</h2>
      <p className="mb-2">{question.description}</p>
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Answers:</h3>
        {answers.length === 0 && <p>No answers yet.</p>}
        {answers.map((a) => (
          <div key={a._id} className="bg-white p-2 rounded shadow mb-2">
            <p>{a.text}</p>
            <span className="text-xs text-gray-500">
              by {a.createdBy?.name} • {new Date(a.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleAnswer} className="flex gap-2">
        <input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Add your answer..."
          className="border p-2 flex-grow"
          required
        />
        <button className="bg-blue-600 text-white px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default QuestionDetails;
