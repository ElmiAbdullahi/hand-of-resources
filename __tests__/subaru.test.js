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
  it('POST /subaru should create a new subaru in the database', async () => {
    const newSubaru = {
      model: 'Outback',
      type: 'wagon',
      year: '2021',
    };
    const resp = await request(app).post('/subaru').send(newSubaru);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "6",
        "model": "Outback",
        "type": "wagon",
        "year": 2021,
      }
    `);
  });
  it('PUT /subaru/1 should update subaru with id #1', async () => {
    const resp = await request(app).put('/subaru/1').send({ model: 'Outback' });
    expect(resp.status).toBe(200);
    expect(resp.body.model).toBe('Outback');
  });
  afterAll(() => {
    pool.end();
  });
});
