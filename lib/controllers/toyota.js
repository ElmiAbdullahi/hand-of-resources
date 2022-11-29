const { Router } = require('express');
const { Toyota } = require('../models/Toyota.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const toyotas = await Toyota.getAll();
    res.json(toyotas);
  } catch (e) {
    next(e);
  }
});
