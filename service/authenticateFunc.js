var jwt = require('jsonwebtoken');

function authenticateFunc(req, res, next) {
    let token = req.get('Authorization');
    token = token.replace('bearer ', '');
    var auth = jwt.verify(token, 'tasmanianDevil', (err, decoded) => {
        if (err) {
            res.status(401);
            res.end();
        }
        if (decoded) {
            next();
        }
    });
}
module.exports = authenticateFunc;