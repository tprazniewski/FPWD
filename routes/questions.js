const express = require('express')
const router = express.Router()
const {getQuestions, getQuestionById, addQuestion, getAnswers, addAnswer, getAnswer} = require('../controllers/questions')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to responder!' })
})

router.get('/questions', getQuestions)
router.get('/questions/:questionId', getQuestionById)

router.post('/questions', addQuestion)

router.get('/questions/:questionId/answers', getAnswers)

router.post('/questions/:questionId/answers', addAnswer)

router.get('/questions/:questionId/answers/:answerId', getAnswer)

exports.questionRoutes = router
