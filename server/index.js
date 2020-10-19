const { green } = require('chalk') 
const { db } = require ('../server/db')
const seed = require ('./db/seed')
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        seed()
        console.log(green('db has been synced'))
        server.listen(PORT, () => console.log(green('listening on port'), PORT));
    })
