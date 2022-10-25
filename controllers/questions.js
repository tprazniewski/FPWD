const { Question } = require("../models/question");
const { Answer } = require("../models/answer");

const getQuestions =  (req, res, next) => {
  // const questions = await req.repositories.questionRepo.getQuestions()
  // res.json(questions)
  Question.findAll()
    .then((allQuestions) => {
      console.log(allQuestions);
      res.status(200).json(allQuestions);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message)

    });
};

const getQuestionById =  (req, res, next) => {
  const { questionId } = req.params;
  console.log(questionId);
  Question.findByPk(questionId)
    .then((allQuestions) => {
      console.log(allQuestions);
      res.status(200).json(allQuestions);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message)

    });
};

const addQuestion =  (req, res, next) => {
  const { author, summary } = req.body;
  Question.create({ author, summary })
    .then((question) => {
      console.log(question);
      res.status(201).json(question);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message)

    });
};

const getAnswers =  (req, res, next) => {
  const { questionId } = req.params;
  Answer.findAll({ where: { questionId } })
    .then((answer) => {
      console.log(answer);
      res.status(200).json(answer);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message)

    });
};
const addAnswer =  (req, res, next) => {
  const { author, summary } = req.body;
  const { questionId } = req.params;
  Answer.create({ author, summary, questionId })
    .then((answer) => {
      console.log(answer);
      res.status(201).json(answer);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message)

    });
};

const getAnswer =   (req, res, next) => {
  const { questionId, answerId } = req.params;
  

};

module.exports = {
  getQuestions,
  getQuestionById,
  addQuestion,
  getAnswers,
  addAnswer,
  getAnswer,
};
