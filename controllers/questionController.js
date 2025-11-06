import Question from "../models/Question.js";

export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const question = await Question.create({
    title,
    description,
    tags,
    createdBy: req.user._id,
  });
  res.json(question);
};

export const getQuestions = async (req, res) => {
  const { search } = req.query;
  const query = search
    ? { $or: [{ title: new RegExp(search, "i") }, { tags: search }] }
    : {};
  const questions = await Question.find(query).populate("createdBy", "name");
  res.json(questions);
};

export const getQuestionById = async (req, res) => {
  const q = await Question.findById(req.params.id).populate("createdBy", "name");
  res.json(q);
};
