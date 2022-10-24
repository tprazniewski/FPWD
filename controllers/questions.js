const getQuestions = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
  }

const getQuestion = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}

const postQuestion = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const getQuestionAnswers = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const postQuestionAnswer = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}
const getQuestionAnswersID = async (req, res, next) => {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.json(questions)
}

module.exports = {
    getQuestions,
    getQuestion,
    postQuestion,
    getQuestionAnswers,
    postQuestionAnswer,
    getQuestionAnswersID
}