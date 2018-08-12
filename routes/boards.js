const express = require('express');
var sequelize = require('../config/database');
var bodyParser = require('body-parser');
const router = express.Router();
const auth = require('../service/authenticateFunc');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/boards/:userID', auth, (req, res, next) => {
    let id = req.params.userID;
    sequelize.query(`SELECT *  FROM boards WHERE owner_id = ?`, { replacements: [id], type: sequelize.QueryTypes.SELECT }).then(myBoards => {
        res.json({ boards: myBoards });
    })
        .catch((error) => {
            next(error);
        })
});

router.post('/boards', auth, (req, res, next) => {
    sequelize.query(`INSERT INTO boards (owner_id, name) VALUES (:owner_id,:name )`, {replacements: { owner_id: req.body.ownerID, name: req.body.title }, type: sequelize.QueryTypes.SELECT})
    .then( () => {
        res.json({ message: 'ok' });
    })
    .catch((error) => {
        next(error);
    });
});

router.delete('/boards/:boardID', auth, (req, res, next) => {
    let id = req.params.boardID;
    sequelize.query(`DELETE FROM boards WHERE id = ?`, { replacements: [id], type: sequelize.QueryTypes.SELECT})
    .then( () => {
        res.json({ message: 'ok' });
    })
    .catch((error) => {
        next(error);
    });
});

module.exports = router;