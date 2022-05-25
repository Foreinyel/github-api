"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rest_1 = require("@octokit/rest");
// import assert from "assert";
var getInstance = (function () {
    var instance;
    return function (token) {
        // assert(instance || token, "")
        if (!instance) {
            instance = new rest_1.Octokit({
                auth: token,
            });
        }
        return instance;
    };
})();
exports.default = getInstance;
