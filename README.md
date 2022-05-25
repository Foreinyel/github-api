# github-api

```
npm install @hemyn/github-api
```

## usage

```javascript
// create repository
const { GitHub } = require("../lib");

const github = new GitHub({
  token: 'your token',
});

github.createRepository({
  name: "svelte-count",
  template_owner: "Foreinyel",
  template_repo: "svelte-component-template",
});
```
