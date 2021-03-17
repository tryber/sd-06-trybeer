const jwt = require('jsonwebtoken');
const Model = require('../models/loginModels');

const secret = 'minhasenhasecreta';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  
  if (token === null) res.status(401).json({ message: 'Token não informado' });
  
  const decoded = jwt.verify(token, secret);
  
  const [foundUser] = await Model.findUserByEmail(decoded.data);

  if (!foundUser) {
    return res
      .status(401)
      .json({ message: 'Erro ao procurar usuário do token.' });
  }

  req.user = foundUser;

 next();
};