"use strict";

const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { UsersModel } = require("./models/index.js");

const express = require("express");
const authRouter = express.Router();

const basicAuthMiddleware = require("./middleware/basic.js");

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foonp
const handleSignup = async (req, res) => {
  try {
    // console.log(req);
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UsersModel.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send("Error Creating User");
  }
};

authRouter.post("/signup", handleSignup);

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
authRouter.post("/signin", basicAuthMiddleware, async (req, res) => {
  try {
    const user = {
      user: req.user.username,
      password: req.user.password,
    };

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = authRouter;
