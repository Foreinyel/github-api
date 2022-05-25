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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.checkBranch = exports.createBranch = exports.getMainBranch = void 0;
var assert_1 = __importDefault(require("assert"));
var utils_node_1 = require("@hemyn/utils-node");
var utils_1 = require("./utils");
var api_1 = require("./api");
var path_1 = __importDefault(require("path"));
var getMainBranch = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var branches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.getBranches(options.github, options)];
            case 1:
                branches = _a.sent();
                return [2 /*return*/, branches.find(function (branch) { return ["main", "master"].includes(branch.name); })];
        }
    });
}); };
exports.getMainBranch = getMainBranch;
/**
 * create a new branch from source branch
 * @param options.owner
 * @param options.repo
 * @param options.sourceBranchName default main branch
 * @param options.targetBranchName
 */
var createBranch = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceBranch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.checkBranch(__assign(__assign({}, options), { branch: options.sourceBranchName }))];
            case 1:
                sourceBranch = _a.sent();
                assert_1.default(!!sourceBranch, "Invalid sourceBranchName: " + options.sourceBranchName);
                return [4 /*yield*/, options.github.git.createRef({
                        owner: options.owner,
                        repo: options.repo,
                        ref: "refs/heads/" + options.targetBranchName,
                        sha: sourceBranch.commit.sha,
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createBranch = createBranch;
var checkBranch = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var branches, branch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.getBranches(options.github, options)];
            case 1:
                branches = _a.sent();
                branch = branches.find(function (item) {
                    return options.branch
                        ? item.name === options.branch
                        : ["main", "master"].includes(item.name);
                });
                return [2 /*return*/, branch];
        }
    });
}); };
exports.checkBranch = checkBranch;
var checkout = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var branch, res, filename;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, exports.checkBranch(__assign({}, options))];
            case 1:
                branch = _b.sent();
                assert_1.default(!!branch, "Invalid branch: " + options.branch);
                return [4 /*yield*/, options.github.rest.repos.downloadZipballArchive({
                        owner: options.owner,
                        repo: options.repo,
                        ref: branch.name,
                    })];
            case 2:
                res = _b.sent();
                filename = (_a = res.headers["content-disposition"]) === null || _a === void 0 ? void 0 : _a.split("filename=")[1].split(";")[0];
                assert_1.default(!!filename, "Failed to get filename.");
                return [4 /*yield*/, utils_1.rm(path_1.default.resolve(options.cwd, filename.split(".")[0]))];
            case 3:
                _b.sent();
                return [4 /*yield*/, utils_1.rm(path_1.default.resolve(options.cwd, filename))];
            case 4:
                _b.sent();
                return [4 /*yield*/, utils_node_1.download({
                        dest: options.cwd,
                        filename: filename,
                        url: res.url,
                        extract: "zip",
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, utils_1.rm(path_1.default.resolve(options.cwd, filename))];
            case 6:
                _b.sent();
                return [2 /*return*/, {
                        folder: filename.split(".")[0],
                    }];
        }
    });
}); };
exports.checkout = checkout;
