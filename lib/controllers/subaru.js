const { Router } = require('express');
const { Subaru } = require('../models/Subaru.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const subarus = await Subaru.getAll();
    res.json(subarus);
  } catch (e) {
    next(e);
  }
});
