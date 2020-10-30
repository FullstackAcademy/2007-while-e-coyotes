const  db  = require('../database')
const Sequelize = require('sequelize')


const Sessions = db.define('sessions', {
    SessionID : {
        type : Sequelize.STRING
    }
})

module.exports = Sessions 