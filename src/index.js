const express = require('express');
const bodyParser = require('body-parser');
const talkerManager = require('./talkerManager');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Onlineee');
});

app.get('/talker', async (req, res) => {
  const talker = await talkerManager.getAllData();
  return res.status(200).json(talker);
});
