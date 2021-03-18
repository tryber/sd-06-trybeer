const { OK } = require('../utils/allStatusCode');
const { updateProfile, profileById } = require('../models/ProfileModel');

const ProfileUpdateService = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name);

  await updateProfile(id, name);
  // const [[updatedProfile]] = await profileById(id);
  // return res.status(OK).json(updatedProfile);
  return res.status(OK).end();
};

module.exports = ProfileUpdateService;