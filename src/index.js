const express = require('express');
const bodyParser = require('body-parser');
const talkerManager = require('./talkerManager');
const { 
  validateEmail, 
  validatePassword, 
  encrypt, 
  validateToken, 
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  ERROR,
} = require('./util');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', validateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const search = await talkerManager.getSearchData(q.toLowerCase());
    return res.status(200).json(search);
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});

app.get('/talker', async (req, res) => {
  try {
    const talker = await talkerManager.getAllData();
    return res.status(200).json(talker);
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await talkerManager.getDataId(Number(id));
    if (talker.length > 0) return res.status(200).json(talker[0]);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  try {
    const token = encrypt();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});

app.post('/talker', 
          validateToken, 
          validateName, 
          validateAge, 
          validateTalk, 
          validateWatchedAt, 
          validateRate,
async (req, res) => {
  const newObj = req.body;
  const newTalker = await talkerManager.createTalkerManager(newObj);
  return res.status(201).send(newTalker);
});

app.put('/talker/:id', 
        validateToken, 
        validateName, 
        validateAge, 
        validateTalk, 
        validateWatchedAt, 
        validateRate,
async (req, res) => {
  try {
    const { id } = req.params;
    const newObj = req.body;

    const updateTalker = await talkerManager.updateTalkerManager(id, newObj);

    return res.status(200).json(updateTalker);
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleteTalker = await talkerManager.deleteTalkerManager(id);
    return res.status(204).json(deleteTalker);
  } catch (error) {
    return res.status(500).json(ERROR);
  }
});
