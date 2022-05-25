"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHub = void 0;
var getInstance_1 = __importDefault(require("./getInstance"));
var commit_push_1 = __importDefault(require("./commit-push"));
var api_1 = require("./api");
var branch_1 = require("./branch");
var pull_1 = require("./pull");
var GitHub = /** @class */ (function () {
    function GitHub(options) {
        this.token = options.token;
        this.github = getInstance_1.default(this.token);
    }
    GitHub.prototype.commitPush = function (options) {
        return commit_push_1.default.call(this, __assign(__assign({}, options), { github: this.github }));
    };
    GitHub.prototype.createRepository = function (options) {
        if ("templateOwner" in options) {
            return api_1.createRepositoryFromTemplate.call(this, this.github, options);
        }
        else {
            return api_1.createRepository.call(this, this.github, options);
        }
    };
    GitHub.prototype.createBranch = function (options) {
        return branch_1.createBranch.call(this, __assign(__assign({}, options), { github: this.github }));
    };
    GitHub.prototype.checkout = function (options) {
        return branch_1.checkout.call(this, __assign(__assign({}, options), { github: this.github }));
    };
    GitHub.prototype.mergeToMainBranch = function (options) {
        return pull_1.mergeToMainBranch.call(this, this.github, options);
    };
    return GitHub;
}());
exports.GitHub = GitHub;
exports.default = GitHub;
