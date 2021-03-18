const rescue = require('express-rescue');

const { ProfileService } = require('../service');

const update = rescue(async (req, res) => {
  const { name, email } = req.body;

  const updated = await ProfileService.update(name, email);

  return res.status(200).json(updated);
});

module.exports = {
  update,
};
