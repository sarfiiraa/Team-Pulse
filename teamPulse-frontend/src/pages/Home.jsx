import { useEffect, useState } from "react";
import API from "../api/axios";
import AskQuestionModal from "../components/AskQuestionModal";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchQuestions = async () => {
    const res = await API.get(`/questions?search=${search}`);
    setQuestions(res.data);
  };

  useEffect(() => { fetchQuestions(); }, [search]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search..."
          className="border p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {user && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            Ask Question
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {questions.map((q) => (
          <Link
            to={`/questions/${q._id}`}
            key={q._id}
            className="bg-white shadow p-4 rounded hover:shadow-md"
          >
            <h3 className="font-semibold text-lg">{q.title}</h3>
            <p className="text-sm text-gray-700">{q.description}</p>
            <p className="text-xs mt-1 text-gray-500">
              By {q.createdBy?.name} • {new Date(q.createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {q.tags?.map((t) => (
                <span key={t} className="bg-gray-200 px-2 py-1 text-xs rounded">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {showModal && (
        <AskQuestionModal onClose={() => setShowModal(false)} onSuccess={fetchQuestions} />
      )}
    </div>
  );
};

export default Home;
