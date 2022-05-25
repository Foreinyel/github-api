"use strict";

const { GitHub } = require("../lib");
const token = require("./token").token;

const github = new GitHub({
  token,
});

github.createRepository({
  name: "svelte-count",
  templateOwner: "Foreinyel",
  templateRepo: "svelte-component-template",
});
