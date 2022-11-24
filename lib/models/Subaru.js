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

  static async updateById(id, newAttrs) {
    // get the current row from the database
    const subaru = await Subaru.getById(id);
    // if we cant find a matching row, lets return null
    if (!subaru) return null;
    // combine the new attributes with the old attributes
    const updatedData = { ...subaru, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE subaru
        SET model = $2, type = $3, year = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.model, updatedData.type, updatedData.year]
    );
    return new Subaru(rows[0]);
  }
}
module.exports = { Subaru };
