import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ManagerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/insights").then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="p-4">Loading insights...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Team Insights</h2>
        <p>Total Questions: <span className="font-medium">{data.totalQuestions}</span></p>
        <p>
          Average Answers per Question:{" "}
          <span className="font-medium">{data.avgAnswers.toFixed(2)}</span>
        </p>
      </div>

      {/* Top Question Askers Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Question Askers</h3>
        {data.topQuestionAskers && data.topQuestionAskers.length > 0 ? (
          <BarChart
            width={500}
            height={300}
            data={data.topQuestionAskers}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="questionsCount" fill="#8884d8" name="Questions Asked" />
          </BarChart>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>

      {/* Top Answerers Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Answerers</h3>
        {data.topAnswerers && data.topAnswerers.length > 0 ? (
          <BarChart
            width={500}
            height={300}
            data={data.topAnswerers}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="answersCount" fill="#82ca9d" name="Answers Given" />
          </BarChart>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;

