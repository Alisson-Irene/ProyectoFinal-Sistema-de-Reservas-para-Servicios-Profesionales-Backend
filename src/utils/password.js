const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const esHashBcrypt = (password) => {
  return typeof password === 'string' && password.startsWith('$2');
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compararPassword = async (passwordIngresado, passwordGuardado) => {
  if (!passwordIngresado || !passwordGuardado) {
    return false;
  }

  if (esHashBcrypt(passwordGuardado)) {
    return bcrypt.compare(passwordIngresado, passwordGuardado);
  }

  return passwordIngresado === passwordGuardado;
};

module.exports = {
  compararPassword,
  esHashBcrypt,
  hashPassword
};
