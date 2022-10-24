const Sequelize = require('sequelize')
const {sequelize} = require('../DB/mySql')


const Answer = sequelize.define('answer',{
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

module.exports = {Answer}