// require('dotenv').config();
// const passport = require('passport');
// const passportJwt = require('passport-jwt');
// const StrategyJwt = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const dbPool = require('../config/database');
// const { config } = require('dotenv');

// passport.use(
//     new StrategyJwt(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET,
//         },

//         function (jwtPayload, done) {
//             return dbPool.execute(`SELECT * FROM users WHERE id = '${jwtPayload.id}'`)
//                 .then((user) => {
//                     return done(null, user);
//                 })
//                 .catch((error) => {
//                     return done(error);
//                 })
//                 // .then(([user]) => {
//                 //     return done(null, user[0]);
//                 // })
//                 // .catch((error) => {
//                 //     return done(error);
//                 // })
//         }
//     )
// )


require('dotenv').config();
const passport = require('passport');
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dbPool = require('../config/database');

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        function(jwtPayload, done) {
            return dbPool.execute(`SELECT * FROM users where id = ${jwtPayload.id}`)
                .then((user) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                })
        }
    )
)