"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github.mergeToMainBranch({
  owner: "Foreinyel",
  repo: "svelte-count",
  branch: "tmp001",
});
