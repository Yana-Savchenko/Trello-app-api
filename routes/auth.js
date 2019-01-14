const express = require('express');
var sequelize = require('../config/database');
var bodyParser = require('body-parser');
const router = express.Router();
var jwt = require('jsonwebtoken');
const db = require('../models')

var passport = require('passport');

const strategy = require('../service/passport');

passport.use(strategy);

var jwtOptions = {};
jwtOptions.secretOrKey = 'tasmanianDevil';

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/registration', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { email: req.body.email }
        })
        if (user) {
            return res.status(400).json({ message: 'This email alredy used' })
        }
        //   let hash = bcrypt.hashSync(req.body.pass, config.salt);
        await db.user.create({
            name: req.body.name,
            password: req.body.pass,
            email: req.body.email,
        })
            .then((user) => {
                if (user) {
                    const payload = {
                        id: user.dataValues.id,
                        email: user.dataValues.email
                    };
                    const token = jwt.sign(payload, "salt");
                    return res.json({ message: "ok", token: token })
                }
            });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// const register = async (req, res) => {
//     try {
//       const user = await db.user.findOne({
//         where: { email: req.body.email }
//       })

//       if (user) {
//         return res.status(400).json({ message: 'This email alredy used' })
//       }
//       let hash = bcrypt.hashSync(req.body.pass, config.salt);
//       await db.user.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         age: req.body.age,
//         password: hash,
//         role: "user"
//       })
//         .then((user) => {
//           if (user) {
//             const payload = {
//               id: user.dataValues.id,
//               email: user.dataValues.email
//             };
//             const token = jwt.sign(payload, config.secretJWT);
//             return res.json({ message: "ok", token: token })
//           }
//         });

//     } catch (err) {
//       return res.status(500).json({ message: err.message })
//     }
//   }

router.post('/login', (req, res, next) => {
    sequelize.query(`SELECT *  FROM users WHERE name = '${req.body.name}' `, { type: sequelize.QueryTypes.SELECT }).then(myUsers => {
        var user = myUsers[0];
        if (user != undefined) {
            if (req.body.name === user.name && req.body.pass === user.password) {
                var payload = { id: user.id };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                let userName = user.name;
                let userID = user.id;
                res.json({ message: "ok", token: token, name: userName, id: userID });
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