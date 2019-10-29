const request = require("supertest");
const app = require("../server");
const Post = require("../models/post");

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.bXltYWlsQGdtYWlsLmNvbQ.I9g5dHecLNCO1v-tQHQXzBgpeElyKdu1H05B8dBNj-g";

describe("Posts", () => {
  beforeAll(async () => {
    await Post.deleteMany({}).exec();
  });
  const newPost = {
    title: "Post 1",
    message: "Post message for jest tes"
  };

  it("should create a Post", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ token: JWT_TOKEN })
      .send(newPost);
    expect(response.status).toBe(201);
  });

  it("should not create a Post", async () => {
    const response = await request(app)
      .post("/posts")
      .send(newPost);
    expect(response.status).toBe(401);
  });

  it("should return all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
  });
});
