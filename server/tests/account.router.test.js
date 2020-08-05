const app = require('../server');
const request = require('supertest');

const user = request.agent(app);

const name = 'name';
const email = 'email@email.com';
const password = 'password';

describe('Account router tests', () => {
  describe('POST to login /api/account/login', () => {
    it("responds with the user's information", async (done) => {
      await user
        .post('/api/account/login')
        .send({
          username: email,
          password: password
        })
        .expect(200);
      done();
    });
  });

  describe('Test the account path', () => {
    it('Get the account owner info', async (done) => {
      const res = await user
        .get('/api/account')
        .expect(200);
      expect(res.body).toEqual({
        id: expect.any(Number),
        name: name,
        email: email,
        access_level: 1
      });
      done();
    });
  });
});

test('app exists', () => {
  expect(true).toBe(true);
});
