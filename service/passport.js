var sequelize = require('../config/database');

var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.secretOrKey = 'tasmanianDevil';
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    sequelize.query(`SELECT *  FROM users WHERE id = ${jwt_payload.id} `, { type: sequelize.QueryTypes.SELECT }).then(myUsers => {
        var user = myUsers[0];
        userID = user.id;
        userName = user.name;
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
});

module.exports = strategy;