const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('toyota routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /toyota should return list of toyotas', async () => {
    const resp = await request(app).get('/toyota');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "model": "Corolla",
          "type": "compact",
          "year": 2017,
        },
        Object {
          "id": "2",
          "model": "Tacoma",
          "type": "pickup",
          "year": 2018,
        },
        Object {
          "id": "3",
          "model": "Highlander",
          "type": "SUV",
          "year": 2019,
        },
        Object {
          "id": "4",
          "model": "Rav4",
          "type": "SUV",
          "year": 2020,
        },
        Object {
          "id": "5",
          "model": "Camry",
          "type": "mid-size",
          "year": 2021,
        },
      ]
    `);
  });
  it('GET /toyota/1 should return toyota details', async () => {
    const resp = await request(app).get('/toyota/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "model": "Corolla",
        "type": "compact",
        "year": 2017,
      }
    `);
  });
  it('POST /toyota should create a new toyota in the database', async () => {
    const newToyota = {
      model: 'Tacoma',
      type: 'pickup',
      year: '2018',
    };
    const resp = await request(app).post('/toyota').send(newToyota);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "6",
        "model": "Tacoma",
        "type": "pickup",
        "year": 2018,
      }
    `);
  });
  it('PUT /toyota/1 should update toyota with id #1', async () => {
    const resp = await request(app).put('/toyota/1').send({ model: 'Tacoma' });
    expect(resp.status).toBe(200);
    expect(resp.body.model).toBe('Tacoma');
  });
  afterAll(() => {
    pool.end();
  });
});
