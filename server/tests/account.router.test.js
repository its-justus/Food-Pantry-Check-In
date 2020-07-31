const app = require('../server');
const testServer = require('supertest');

describe('Test the account path', () => {
  test('It should respond 200 the account owner', async () => {
    const response = await testServer(app).get('/api/account');
    expect(response.statusCode).toBe(200);
  });
});
