const pool = require('../utils/pool.js');

class Subaru {
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
    const { rows } = await pool.query('SELECT * from subaru');
    return rows.map((subaru) => new Subaru(subaru));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from subaru where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Subaru(rows[0]);
  }

  static async insert(subaru) {
    const { rows } = await pool.query(
      `
      INSERT INTO subaru (model, type, year)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [subaru.model, subaru.type, subaru.year]
    );
    return new Subaru(rows[0]);
  }
}
module.exports = { Subaru };
