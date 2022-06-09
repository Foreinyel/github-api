"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github.compareBranches({
  owner: "Foreinyel",
  repo: "count-button-secondary",
  branch: "develop",
});
