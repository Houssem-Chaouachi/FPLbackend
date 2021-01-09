const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
var User = require('../Models/UserSchema');
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy(async (token, done) => {
    const tokenData = await jwt.verify(token, "token");

    const user = await User.findOne({ _id: tokenData.data._id });
    if (!user) {
      return done(null, false);
    } else return done(null, { user });
  })
);