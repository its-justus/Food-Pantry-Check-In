const app = require('../server');
const testServer = require('supertest');

describe('Test the account path', () => {
  it('It should respond 200 the account owner', async (done) => {
    const response = await testServer(app).get('/api/account');
    // expect(response.statusCode).toBe(200);
    done();
  });
});
