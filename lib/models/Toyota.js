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

  static async updateById(id, newAttrs) {
    // get the current row from the database
    const toyota = await Toyota.getById(id);
    // if we cant find a matching row, lets return null
    if (!toyota) return null;
    // combine the new attributes with the old attributes
    const updatedData = { ...toyota, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE toyota
        SET model = $2, type = $3, year = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.model, updatedData.type, updatedData.year]
    );
    return new Toyota(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
          DELETE from toyota
          WHERE id = $1
          RETURNING *
          `,
      [id]
    );
    if (!rows[0]) return null;
    return new Toyota(rows[0]);
  }
}

module.exports = { Toyota };
