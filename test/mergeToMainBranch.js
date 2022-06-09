"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github
  .mergeToMainBranch({
    owner: "Foreinyel",
    repo: "count-button-secondary",
    branch: "develop",
  })
  .then((resulet) => console.log(resulet));
