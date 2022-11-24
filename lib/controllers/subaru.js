const { Router } = require('express');
const { Subaru } = require('../models/Subaru.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const subaru = await Subaru.getById(req.params.id);
      if (!subaru) {
        next();
      }
      res.json(subaru);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const subarus = await Subaru.getAll();
      res.json(subarus);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const subaru = await Subaru.insert(req.body);
      res.json(subaru);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const subaru = await Subaru.updateById(req.params.id, req.body);
      if (!subaru) next();
      res.json(subaru);
    } catch (e) {
      next(e);
    }
  });
