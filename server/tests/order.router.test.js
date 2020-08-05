const app = require("../server");
const request = require("supertest")(app);
const pool = require("../modules/pool");

// setup test environment
// beforeAll(async () => {
// 	pool.query(`
// 		INSERT INTO "order" ()
// 		VALUES `)
// })

let orderID;
describe("POST to /api/order", () => {
	it("responds with json", async (done) => {
		const res = await request
			.post("/api/order")
			.send({
				account_id: 1,
				location_id: 1,
				dietary_restrictions: "Dairy",
				walking_home: false,
				pregnant: false,
				child_birthday: true
			})
			.expect("Content-Type", /json/)
			.expect(201)
		const order = res.body;
		expect(order).toHaveProperty('id');
		expect(order).toHaveProperty('account_id', 1);
		expect(order).toHaveProperty('checkin_at');
		expect(order).toHaveProperty('checkout_at');
		expect(order).toHaveProperty('location_id', 1);
		expect(order).toHaveProperty('dietary_restrictions', "Dairy");
		expect(order).toHaveProperty('walking_home', false);
		expect(order).toHaveProperty('pregnant', false);
		expect(order).toHaveProperty('child_birthday', true);
		orderID = res.body.id;
		done();
	});
});

describe("GET to /api/order", () => {
  it("Respond with json", async (done) => {
    const res = await request
			.get("/api/order")
			.expect("Content-Type", /json/)
      .expect(200)
		
		expect(res.body.length).toBeGreaterThan(0);
		done();
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

