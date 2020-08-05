const app = require("../server");
const request = require("supertest")(app);

// Start with posting a new location
describe("POST /api/location", () => {
  it("responds with json", async (done) => {
    const res = await request
      .post("/api/location")
      .send({
        id: 1234567,
        description: "test",
      })
      //.expect("Content-Type", /json/)
      .expect(201);
			expect(res.body).toEqual(expect.objectContaining({id: 1234567}));
    done();
  });
});

describe("PUT /api/location/:id", () => {
  it("responds with json", async (done) => {
    const res = await request
      .put("/api/location/1234567")
      .send({
        id: 1234567,
        description: "test edited",
      })
      //.expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toEqual({
      id: 1234567,
      description: "test edited",
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

		expect(res.body).toEqual(
			expect.arrayContaining([expect.objectContaining({
			id: 1234567,
			description: "test edited",
		})])
		);
		
		done();
  });
});

describe("DELETE /api/location/id", () => {
	it("responds with status code 204 OK", async (done) => {
		const res = await request
		.delete("/api/location/1234567")
		.expect(204);
	done();
	})
})