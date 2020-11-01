const { green } = require("chalk");
const { db } = require("../server/db");
//const seed = require ('./db/seed')
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(green("listening on port"), PORT));

//The following code will run the seedfile when the app is first deployed. This is commented out until production.
/*db.sync()
    .then(() => {
        seed()
        console.log(green('db has been synced'))
        server.listen(PORT, () => console.log(green('listening on port'), PORT));
    })*/
