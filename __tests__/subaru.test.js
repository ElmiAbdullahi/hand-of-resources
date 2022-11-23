const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('subaru routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /subaru should return list of subarus', async () => {
    const resp = await request(app).get('/subaru');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "model": "BRZ",
          "type": "coupe",
          "year": 2017,
        },
        Object {
          "id": "2",
          "model": "Outback",
          "type": "wagon",
          "year": 2021,
        },
        Object {
          "id": "3",
          "model": "WRX STI",
          "type": "sedan",
          "year": 2015,
        },
        Object {
          "id": "4",
          "model": "Crosstrek XV",
          "type": "sedan",
          "year": 2020,
        },
        Object {
          "id": "5",
          "model": "Forester",
          "type": "SUV",
          "year": 2019,
        },
      ]
    `);
  });
  it('GET /subaru/1 should return subaru details', async () => {
    const resp = await request(app).get('/subaru/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "model": "BRZ",
        "type": "coupe",
        "year": 2017,
      }
    `);
  });
  afterAll(() => {
    pool.end();
  });
});
