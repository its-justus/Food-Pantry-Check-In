const app = require("../server");
const request = require("supertest")(app);
const pool = require("../modules/pool");

// setup test environment
// beforeAll(async () => {
// 	pool.query(`
// 		INSERT INTO "order" ()
// 		VALUES `)
// })


describe("POST to /api/order", () => {
	it("responds with json", async (done) => {
		const res = await request
			.post("/api/order")
			.send({
				account_id: 1234,
				location_id: 5,
				dietary_restrictions: "Dairy",
				walking_home: false,
				pregnant: false,
				child_birthday: true
			})
			.expect("Content-Type", /json/)
			.expect(201)
		
		expect(res.body.account_id).toBe(1234)
	});
});

describe("GET to /api/order", () => {
  it("Respond with 200", (done) => {
    request(app)
      .get("/api/order")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("GET to /api/order/active", () => {
  it("Respond with 200", (done) => {
    request(app)
      .get("/api/order")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("PUT to /api/order/id", () => {
  it("Respond with 200 OK", (done) => {
    request(app)
      .put("/api/order/1")
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
    });
  });
});

describe("DELETE to /api/order/id", () => {
  it("Respond with 204", (done) => {
    request(app)
      .delete("/api/order/1")
      .set("Accept", "application/json")
      .expect(204)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

