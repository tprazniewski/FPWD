const express = require('express')
const router = express.Router()
const {getQuestions, getQuestionById, addQuestion, getAnswers, addAnswer, getAnswer} = require('../controllers/questions')



router.get('/', getQuestions)
router.get('/:questionId', getQuestionById)

router.post('/', addQuestion)

router.get('/:questionId/answers', getAnswers)

router.post('/:questionId/answers', addAnswer)

router.get('/:questionId/answers/:answerId', getAnswer)

exports.questionRoutes = router
