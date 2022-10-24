const express = require('express')
const router = express.Router()
const {getQuestions, getQuestion, postQuestion, getQuestionAnswers, postQuestionAnswer, getQuestionAnswersID} = require('../controllers/questions')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to responder!' })
})

router.get('/questions', getQuestions)
router.get('/questions/:questionId', getQuestion)

router.post('/questions', postQuestion)

router.get('/questions/:questionId/answers', getQuestionAnswers)

router.post('/questions/:questionId/answers', postQuestionAnswer)

router.get('/questions/:questionId/answers/:answerId', getQuestionAnswersID)

exports.questionRoutes = router
