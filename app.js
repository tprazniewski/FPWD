const express = require('express')
const { urlencoded, json } = require('body-parser')
const makeRepositories = require('./middleware/repositories')
require("dotenv").config();
const {questionRoutes} = require('./routes/questions')

const STORAGE_FILE_PATH = 'questions.json'
const PORT = process.env.PORT || 3000
console.log(process.env.PORT)

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(makeRepositories(STORAGE_FILE_PATH))

app.use('/',questionRoutes)

app.listen(PORT, () => {
  console.log(`Responder app listening on port ${PORT}`)
})
