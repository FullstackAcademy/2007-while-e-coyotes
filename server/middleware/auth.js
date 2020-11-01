const User = require("../db/models/User");
const Sessions = require("../db/models/Sessions");
const { cookieSessionName } = require("../constants");

const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionID;
    console.log("SESSION ID: ", sessionId);
    if (!sessionId) {
      console.log("There is no session id");
      req.user = null;
    } else {
      const session = await Sessions.findOne({
        where: {
          SessionID: sessionId,
        },
        include: User,
      });

      if (!session) {
        console.log("invalid session ID, session not found in DB");
        req.user = null;
      } else {
        console.log(`Session user identified: ${session.user.username}`);
        req.user = session.user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
