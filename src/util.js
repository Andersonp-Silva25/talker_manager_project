const crypto = require('crypto');

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

module.exports = { validateEmail, validatePassword, encrypt };