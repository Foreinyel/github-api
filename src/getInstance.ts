import { Octokit } from "@octokit/rest";
// import assert from "assert";

const getInstance = (() => {
  let instance: Octokit;
  return function (token: string) {
    // assert(instance || token, "")
    if (!instance) {
      instance = new Octokit({
        auth: token,
      });
    }
    return instance;
  };
})();

export default getInstance;
