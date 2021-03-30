const { updateUser, findUser } = require('../models/Users');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const ProfileService = async (req, res, _next) => {
  try {
    const { name, email } = req.body;
    const user = await findUser(email);
    if (!user) {
      res.status(STATUS_NOT_FOUND).json({ message: 'User not found!' });
    }
    await updateUser(name, email);
    res.status(STATUS_OK).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  ProfileService,
};