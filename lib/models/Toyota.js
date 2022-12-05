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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM toyota WHERE id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Toyota(rows[0]);
  }

  static async insert(toyota) {
    const { rows } = await pool.query(
      `
      INSERT INTO toyota (model, type, year)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [toyota.model, toyota.type, toyota.year]
    );
    return new Toyota(rows[0]);
  }
}

module.exports = { Toyota };
