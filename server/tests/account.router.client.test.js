const app = require('../server');
const request = require('supertest');

const user = request.agent(app);

const name = 'test';
const email = 'test@test.com';
const password = 'test';

describe('GET /api/account', () => {
  it('Reject get info for current user while logged out', async (done) => {
    await user
      .get('/api/account')
      .expect(403);
    done();
  });
});

describe('GET /api/account/1', () => {
  it('Reject get info for specific user while logged out', async (done) => {
    await user
      .get('/api/account/')
      .expect(403);
    done();
  });
});

describe('PUT /api/account/1', () => {
  it('Reject account updating while logged out', async (done) => {
    await user
      .put('/api/account/1')
      .expect(403);
    done();
  });
});

describe('DELETE /api/account/1', () => {
  it('Reject account deletion while logged out', async (done) => {
    await user
      .delete('/api/account/1')
      .expect(403);
    done();
  });
});

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

describe('GET /api/account/', () => {
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

describe('GET /api/account/1', () => {
  it('Reject get info for specific user because current user is not an admin', async (done) => {
    await user
      .get('/api/account/')
      .expect(403);
    done();
  });
});
