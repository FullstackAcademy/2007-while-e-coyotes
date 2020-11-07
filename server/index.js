const { green } = require("chalk");
const { db } = require("../server/db");
// const seed = require ('./db/Seed/seed')
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(green("listening on port"), PORT));

// db.sync().then( async() => {
//   await seed();
//   console.log(green("db has been synced"));
//   server.listen(PORT, () => console.log(green("listening on port"), PORT));
// });
