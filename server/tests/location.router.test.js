const app = require("../server");
const request = require("supertest")(app);

// Start with posting a new location
describe("POST /api/location", () => {
  it("responds with json", async (done) => {
    const res = await request
      .post("/api/location")
      .send({
        id: 1,
        description: "test location",
      })
      //.expect("Content-Type", /json/)
      .expect(201);
    expect(res.body).toEqual({
      id: 1,
      description: "test location",
    });
    done();
  });
});

describe("PUT /api/location/:id", () => {
  it("responds with json", async (done) => {
    const res = await request
      .put("/api/location/1")
      .send({
        id: 1,
        description: "test location edited",
      })
      //.expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toEqual({
      id: 1,
      description: "test location edited",
    });
    done();
  });
});

describe("GET /api/location/", () => {
  it("responds with json", async (done) => {
    const res = await request
      .get("/api/location")
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
			.expect(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body[0]).toEqual({
			id: 1,
			description: "test location edited",
		});
		done();
  });
});

describe("DELETE /api/location/id", () => {
	it("responds with status code 204 OK", async (done) => {
		const res = await request
		.delete("/api/location/1")
		.expect(204);
	done();
	})
})