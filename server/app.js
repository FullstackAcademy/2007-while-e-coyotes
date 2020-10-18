const express = require('express')
const path = require('path')
const volleyball = require('volleyball')

const app = express()

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./routes'))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use((err, req, res, next) => {
    console.error(err, err.stack);
    res.status(500).send(err);
});

module.exports = app
