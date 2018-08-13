const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const boards = require('./routes/boards');
const WebSocket = require('ws');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(auth);
app.use(tasks);
app.use(boards);


app.use(function (err, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

