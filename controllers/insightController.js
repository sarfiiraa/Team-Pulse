import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";

export const getInsights = async (req, res) => {
  try {
    // Total number of questions
    const totalQuestions = await Question.countDocuments();

    // Fetch questions and answers with creator details
    const questions = await Question.find().populate("createdBy", "name email");
    const answers = await Answer.find().populate("createdBy", "name email");

    // --- COUNT TOP ANSWERERS ---
    const answerActivity = {};
    answers.forEach((a) => {
      const userId = a.createdBy?._id?.toString();
      if (userId) {
        answerActivity[userId] = {
          count: (answerActivity[userId]?.count || 0) + 1,
          name: a.createdBy.name,
          email: a.createdBy.email,
        };
      }
    });

    const topAnswerers = Object.entries(answerActivity)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([userId, data]) => ({
        userId,
        name: data.name,
        email: data.email,
        answersCount: data.count,
      }));

    // --- COUNT TOP QUESTION ASKERS ---
    const questionActivity = {};
    questions.forEach((q) => {
      const userId = q.createdBy?._id?.toString();
      if (userId) {
        questionActivity[userId] = {
          count: (questionActivity[userId]?.count || 0) + 1,
          name: q.createdBy.name,
          email: q.createdBy.email,
        };
      }
    });

    const topQuestionAskers = Object.entries(questionActivity)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([userId, data]) => ({
        userId,
        name: data.name,
        email: data.email,
        questionsCount: data.count,
      }));

    // --- Average Answers per Question ---
    const avgAnswers =
      totalQuestions > 0 ? answers.length / totalQuestions : 0;

    res.json({
      totalQuestions,
      avgAnswers,
      topAnswerers,
      topQuestionAskers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

