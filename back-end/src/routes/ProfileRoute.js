const { Router } = require('express');

const { ProfileController } = require('../controller');

const ProfileRoute = Router();

ProfileRoute.put('/', ProfileController.update);

module.exports = ProfileRoute;