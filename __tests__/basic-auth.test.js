"use strict";

require("dotenv").config();
const { db, users } = require("../src/models/index.js");

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("Testing user model", () => {
  test("User model can create a token", async () => {
    const user = await users.create({
      username: "Test",
      password: "Test",
    });

    console.log(user.token);
    expect(user.username).toEqual("Test");
    expect(user.token).toBeTruthy();
  });
});
