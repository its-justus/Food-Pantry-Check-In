const app = require("../server");
const request = require("supertest");

describe("Testing the GET for order", () => {
  it("It should respond with 200 OK", async (done) => {
    const response = await request(app).get("/api/order");
    expect(response.statusCode).toBe(200);
    done();
  });
});
