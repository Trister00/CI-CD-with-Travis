const app = require("../server");
const request = require("supertest");
const User = require("../models/user");

describe("User Authentication", () => {
  const newUser = {
    email: "mail_jest@gmail.com",
    password: "test123456"
  };
  beforeAll(async () => {
    await User.deleteMany({}).exec();
  });
  it("should register the user", async () => {
    const response = await request(app)
      .post("/register")
      .send(newUser);
    expect(response.status).toBe(201);
  });
  it("should login the user", async () => {
    expect.assertions(2);
    const response = await request(app)
      .post("/login")
      .send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
  });
});
