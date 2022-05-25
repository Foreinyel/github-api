"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github.createBranch({
  targetBranchName: "tmp001",
  repo: "svelte-count",
  owner: "Foreinyel",
});
