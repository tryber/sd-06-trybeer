const { ProfileModel } = require('../model');

const update = async (name, email) => ProfileModel.update(name, email);

module.exports = {
  update,
};
