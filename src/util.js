const crypto = require('crypto');

const statusCode = 400;

const encrypt = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const isEmail = emailRegex.test(email);
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
 
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  const minCharacter = 6;
  const verifyPassword = password.length < minCharacter;

  if (verifyPassword) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
  if (typeof authorization !== 'string') return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const requiredName = 'O campo "name" é obrigatório';
  const nameSize = 'O "name" deve ter pelo menos 3 caracteres';

  if (!name) return res.status(statusCode).json({ message: requiredName });
  if (name.length < 3) return res.status(statusCode).json({ message: nameSize });

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const requiredAge = 'O campo "age" é obrigatório';
  const largeOfAge = 'A pessoa palestrante deve ser maior de idade';

  if (!age) return res.status(statusCode).json({ message: requiredAge });
  if (age < 18) return res.status(statusCode).json({ message: largeOfAge });

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const requiredTalk = 'O campo "talk" é obrigatório';

  if (!talk) return res.status(statusCode).json({ message: requiredTalk });

  next();
};

const validateWatchedAt = (req, res, next) => { 
  const { talk: { watchedAt } } = req.body;
  const requiredWatchedAt = 'O campo "watchedAt" é obrigatório';
  const validFormatDate = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  const patternDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const date = patternDate.test(watchedAt);

  if (!watchedAt) return res.status(statusCode).json({ message: requiredWatchedAt });
  if (!date) return res.status(statusCode).json({ message: validFormatDate });

  next();
};

const validateRate = (req, res, next) => { 
  const { talk: { rate } } = req.body;
  const requiredRate = 'O campo "rate" é obrigatório';
  const sizeRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

  if (!rate) return res.status(statusCode).json({ message: requiredRate });
  if (rate < 0 || rate > 5) return res.status(statusCode).json({ message: sizeRate });
  if (!(Number.isInteger(rate))) return res.status(statusCode).json({ message: sizeRate });

  next();
};

module.exports = { 
  validateEmail, 
  validatePassword, 
  encrypt,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
 };