const express = require('express');
var sequelize = require('../config/database');
var bodyParser = require('body-parser');
const router = express.Router();
const auth = require('../service/authenticateFunc');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/task/:boardID', auth, (req, res, next) => {
    let id = req.params.boardID;
    sequelize.query(`SELECT *  FROM tasks WHERE board_id = ?`, { replacements: [id], type: sequelize.QueryTypes.SELECT }).then(tasks => {
        res.json({ tasks });
    })
        .catch((error) => {
            next(error);
        })
});

router.post('/task', auth, (req, res, next) => {
    sequelize.query(`INSERT INTO tasks (list, content, board_id, title, position) VALUES ('${req.body.list}','${req.body.content}', '${req.body.boardID}', '${req.body.title}', '${req.body.position}')`)
    .then( () => {
        res.json({ message: 'ok' });
    })
    .catch((error) => {
        next(error);
    });
});

router.delete('/task/:taskID', auth, (req, res, next) => {
    let id = req.params.taskID;
    sequelize.query(`DELETE FROM tasks WHERE id = ?`, { replacements: [id], type: sequelize.QueryTypes.SELECT})
    .then( () => {
        res.json({ message: 'ok' });
    })
    .catch((error) => {
        next(error);
    });
});

router.put('/task', auth, (req, res, next) => {
    req.body.map(function (task) {
        sequelize.query(`UPDATE tasks SET list = :list, position = :position WHERE id = :id`, {replacements: { id: task.id, list: task.list, position: task.position  }, type: sequelize.QueryTypes.SELECT});
    } )
    res.json({ message: 'ok upd' });

});

module.exports = router;