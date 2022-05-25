"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github.commitPush({
  cwd: "/Users/foreinyel/Workspace/demos/cloud-components/repo-manager/workspace_tmp/Foreinyel-svelte-count-b567293",
  repo: "svelte-count",
  owner: "Foreinyel",
  commitMessage: "readme",
  branch: "tmp001",
});
