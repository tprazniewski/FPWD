const express = require("express");
const { urlencoded, json } = require("body-parser");
const makeRepositories = require("./middleware/repositories");
require("dotenv").config();
const { questionRoutes } = require("./routes/questions");
const { Answer } = require("./models/answer");
const { Question } = require("./models/question");
const { sequelize } = require("./DB/mySql.js");

const STORAGE_FILE_PATH = "questions.json";
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(makeRepositories(STORAGE_FILE_PATH));

app.use("/", questionRoutes);
app.use('*',(req,res,next)=>{
  res.status(200).json({ message: 'This route is invalid' })

})



// Question.hasMany(Answer);
// Answer.belongsTo(Question, { constraints: true, onDelete: "CASCADE" });
// sequelize
//   .sync({ force: true })

app.listen(PORT, () => {
  console.log(`Responder app listening on port ${PORT}`);
});

module.exports = app; // for testing