const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const cookieparser = require('cookie-parser')
const app = express()

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', require('./routes'))
app.use('/auth',require('./routes/validation'))

app.use((err, req, res, next) => {
    console.error(err, err.stack);
    res.status(500).send(err);
});

module.exports = app
