const crypto = require('crypto');

const encrypt = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const minCharacter = 5;
  const verifyPassword = password.length > minCharacter;
  return verifyPassword;
};

module.exports = { validateEmail, validatePassword, encrypt };