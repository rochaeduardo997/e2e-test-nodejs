import { jest, expect, test, describe } from '@jest/globals';
import Server                           from '../../src/server.js';
import superTest                        from 'supertest';

describe('API E2E Test Suite', () => {
  test('GET    / should return an array', async () => {
    const response = await superTest(Server).get('/');
    const data     = JSON.parse(response.text);

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toEqual(0);
  });

  test('POST   / should save an item and return ok', async () => {
    const response = await superTest(Server)
    .post('/')
    .send({
      name: 'carlos',
      age: 25
    });
    const expected = JSON.stringify({ ok: 1 });

    expect(response.text).toStrictEqual(expected);
  });

  test('DELETE / should delete all database and return ok', () => {
  });
});

