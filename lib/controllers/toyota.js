const { Router } = require('express');
const { Toyota } = require('../models/Toyota.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const toyotas = await Toyota.getAll();
      res.json(toyotas);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const toyota = await Toyota.getById(req.params.id);
      if (!toyota) {
        next();
      }
      res.json(toyota);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const toyota = await Toyota.insert(req.body);
      res.json(toyota);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const toyota = await Toyota.updateById(req.params.id, req.body);
      if (!toyota) next();
      res.json(toyota);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const toyota = await Toyota.delete(req.params.id);
      if (!toyota) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
