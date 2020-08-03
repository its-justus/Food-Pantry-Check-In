const app = require("../server");
const request = require("supertest");

describe("GET to /api/order", () => {
  it("Respond with 200", (done) => {
    request(app)
      .get("/api/order")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

test("POST to /api/order", (done) => {
  request(app)
    .post("/api/order")
    .send({
      id: 1,
      account_id: 1234,
      location_id: 5,
      dietary_restrictions: "Dairy",
      walking_home: false,
      pregnant: false,
      child_birthday: true
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .end(function (err, res) {
      if (err) throw err;
      done();
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

