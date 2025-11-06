import Answer from "../models/Answer.js";

export const addAnswer = async (req, res) => {
  const answer = await Answer.create({
    questionId: req.params.questionId,
    text: req.body.text,
    createdBy: req.user._id,
  });
  res.json(answer);
};

export const getAnswers = async (req, res) => {
  const answers = await Answer.find({ questionId: req.params.questionId }).populate(
    "createdBy",
    "name"
  );
  res.json(answers);
};
