const express = require('express');
var sequelize = require('../config/database');
var bodyParser = require('body-parser');
const router = express.Router();
var jwt = require('jsonwebtoken');

var passport = require('passport');

const strategy = require('../service/passport');

passport.use(strategy);

var jwtOptions = {};
jwtOptions.secretOrKey = 'tasmanianDevil';

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/registration', (req, res, next) => {
    sequelize.query(`SELECT *  FROM users WHERE name = '${req.body.name}' `, { type: sequelize.QueryTypes.SELECT }).then(myUsers => {
        var foundUser = myUsers[0];
        if (foundUser === undefined) {
            sequelize.query(`INSERT INTO users (name, password, email)
                                             VALUES ('${req.body.name}', '${req.body.pass}', '${req.body.email}')`);
                res.status(200).end();
            } else {
                console.log('user: ' + req.body.name + ' exists!');
                res.status(404).send(req.body.name);
            }
    })
    .catch((error) => {
        next(error);
      })
})

router.post('/login', (req, res, next) => {
        sequelize.query(`SELECT *  FROM users WHERE name = '${req.body.name}' `, { type: sequelize.QueryTypes.SELECT }).then(myUsers => {
            var user = myUsers[0];
            if (user != undefined) {
                if (req.body.name === user.name && req.body.pass === user.password) {
                    var payload = {id: user.id};
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    let userName = user.name;
                    let userID = user.id;
                     res.json({message: "ok", token:token, name:userName, id:userID});
                } else {
                    res.status(401).send('error');
                }
            } else {
                res.status(401).send('error');
            }
        })
        .catch((error) => {
            next(error);
          })
});

module.exports = router;