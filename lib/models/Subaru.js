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
}
module.exports = { Subaru };
