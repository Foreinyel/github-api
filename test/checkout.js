"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github
  .checkout({
    cwd: "/Users/foreinyel/Workspace/demos/cloud-components/repo-manager/workspace_tmp",
    repo: "svelte-count",
    owner: "Foreinyel",
    branch: "tmp001",
  })
  .then((res) => console.log(res));
