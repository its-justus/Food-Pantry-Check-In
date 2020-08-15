const app = require('../server');
const request = require('supertest');
const pool = require('../modules/pool');
const users = require('./testUsers');

const adminUser = request.agent(app);
const adminInfo = users.adminUser;
const adminEmail = adminInfo.adminEmail;
const adminPassword = adminInfo.adminPassword;

const locationID = users.locationID;
const locationDescription = 'order test location';

const testUser = request.agent(app);
const testUserInfo = users.testUser;
const testUserID = testUserInfo.testUserID;
const testUserName = testUserInfo.testUserName;
const testUserEmail = testUserInfo.testUserEmail;
const testUserPassword = testUserInfo.testUserPassword;

// afterAll(async (done) => {
//   await pool.query(`DELETE FROM order WHERE location_id = ${locationID};`);
//   await pool.query(`DELETE FROM location WHERE location_id = ${locationID};`);
//   done();
// });

describe('POST to login /api/account/login', () => {
  it("responds with the administrator's information", async (done) => {
    await adminUser
      .post('/api/account/login')
      .send({
        username: adminEmail,
        password: adminPassword
      })
      .expect(200);
    done();
  });
});

describe('GET /api/account/', () => {
  it("Get the admin's info", async (done) => {
    const res = await adminUser
      .get('/api/account')
      .expect(200);
    expect(res.body).toEqual({
      id: 1,
      name: adminInfo.name,
      email: adminInfo.adminEmail,
      access_level: adminInfo.accessLevel,
      household_id: adminInfo.householdID,
      latest_order: adminInfo.latestOrder,
      active: adminInfo.active
    });
    done();
  });
});

//   describe(`GET /api/account/${newUserId}`, () => {
//     it('Get info for the newly added client', async (done) => {
//       const res = await adminUser
//         .get(`/api/account/${newUserId}`)
//         .expect(200);
//       expect(res.body).toEqual({
//         id: newUserId,
//         name: newUserName,
//         email: newUserEmail,
//         access_level: 1
//       });
//       done();
//     });
//   });

//   describe(`DELETE /api/account/${newUserId}`, () => {
//     it('This is the last test so delete the newly added client', async (done) => {
//       await adminUser
//         .delete(`/api/account/${newUserId}`)
//         .expect(204);
//       done();
//     });
//   });
// });


// // Start with posting a new location
// describe("POST /api/location", () => {
//   it("responds with json", async (done) => {
//     const res = await request
//       .post("/api/location")
//       .send({
//         id: 1234567,
//         description: "test",
//       })
//       //.expect("Content-Type", /json/)
//       .expect(201);
// 			expect(res.body).toEqual(expect.objectContaining({id: 1234567}));
//     done();
//   });
// });

// describe("PUT /api/location/:id", () => {
//   it("responds with json", async (done) => {
//     const res = await request
//       .put("/api/location/1234567")
//       .send({
//         id: 1234567,
//         description: "test edited",
//       })
//       //.expect("Content-Type", /json/)
//       .expect(200);
//     expect(res.body).toEqual({
//       id: 1234567,
//       description: "test edited",
//     });
//     done();
//   });
// });

// describe("GET /api/location/", () => {
//   it("responds with json", async (done) => {
//     const res = await request
//       .get("/api/location")
//       .set("Accept", "application/json")
//       // .expect("Content-Type", /json/)
// 			.expect(200);

// 		expect(res.body).toEqual(
// 			expect.arrayContaining([expect.objectContaining({
// 			id: 1234567,
// 			description: "test edited",
// 		})])
// 		);
		
// 		done();
//   });
// });

// describe("DELETE /api/location/id", () => {
// 	it("responds with status code 204 OK", async (done) => {
// 		const res = await request
// 		.delete("/api/location/1234567")
// 		.expect(204);
// 	done();
// 	})
// })