const Sequelize = require('sequelize')
const {sequelize} = require('../DB/mySql')


const Question = sequelize.define('question',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allownull: false,
        primaryKey: true
    },
    author: {
        type: Sequelize.STRING,
        allownull: false
    },
    summary: {
        type: Sequelize.STRING,
        allownull: false
    }
})

module.exports = {Question}