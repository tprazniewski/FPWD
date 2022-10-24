const getQuestions = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
  }

const getQuestionById = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}

const addQuestion = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const getAnswers = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const addAnswer = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const getAnswer = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}

module.exports = {
    getQuestions,
    getQuestionById,
    addQuestion,
    getAnswers,
    addAnswer,
    getAnswer
}