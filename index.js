const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));

app.get('/favicon.ico', (req, res) => ({ res.sendStatus(200); }));

app.get('/', (req, res) => res.json({message: 'JAJA SALUDOS'}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
