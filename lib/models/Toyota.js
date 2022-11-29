// const toyota = require('../controllers/toyota.js');
const pool = require('../utils/pool.js');

class Toyota {
  id;
  model;
  type;
  year;

  constructor(row) {
    this.id = row.id;
    this.model = row.model;
    this.type = row.type;
    this.year = row.year;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from toyota');
    return rows.map((toyota) => new Toyota(toyota));
  }
}

module.exports = { Toyota };
