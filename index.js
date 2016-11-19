const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';
const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const buildError = res => {
  return res.json({message: 'khe'});
};

const buildRanOutOfMessagesResponse = res => {
  return res.json({message: 'We ran out of messages OMG!😱'});
};

const findAndDeleteRandomMessage = (db, res) => {
  db.collection('messages').aggregate([{$sample: {size: 1}}], (err, result) => {
    if (err) return buildError(res);
    if (result.length === 0) return buildRanOutOfMessagesResponse(res);
    db.collection('messages').remove({_id: result[0]._id});
    return res.json({message: result[0].message});
  });
};

const insertMessage = (db, res, message) => {
  db.collection('messages').insert({message}, (err, result) => {
    if (err) return buildError(res);
    return res.json({status: 'ok'});
  });
};

const controller = {
  popMessage: (req, res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) return buildError(res);
      return findAndDeleteRandomMessage(db, res);
    });
  },
  pushMessage: (req, res) => {
    const { message } = req.body;
    MongoClient.connect(url, (err, db) => {
      if (err || !message) return buildError(res);
      return insertMessage(db, res, message);
    });
  }
}

app.get('/favicon.ico', (req, res) => { 
  return res.sendStatus(200); 
});

app.get('/', controller.popMessage);
app.post('/', controller.pushMessage);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
