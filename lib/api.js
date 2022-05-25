"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranches = exports.createRepositoryFromTemplate = exports.createRepository = exports.updateReference = exports.createCommit = exports.createTree = exports.getReferenceCommit = void 0;
var getReferenceCommit = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, github.git.getRef(options)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                err_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getReferenceCommit = getReferenceCommit;
var createTree = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var blobs, files, tree;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!((_a = options === null || options === void 0 ? void 0 : options.files) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(options.files.map(function (item) {
                        return github.git.createBlob({
                            owner: options.owner,
                            repo: options.repo,
                            encoding: "utf-8",
                            content: Buffer.isBuffer(item.content)
                                ? item.content.toString("base64")
                                : item.content,
                        });
                    }))];
            case 1:
                blobs = _b.sent();
                files = blobs.map(function (blob, idx) {
                    return {
                        sha: blob.data.sha,
                        path: options.files[idx].path,
                        mode: "100644",
                        type: "blob",
                    };
                });
                return [4 /*yield*/, github.git.createTree({
                        owner: options.owner,
                        repo: options.repo,
                        tree: files,
                        base_tree: options.referenceCommitSha,
                    })];
            case 2:
                tree = _b.sent();
                return [2 /*return*/, tree.data.sha];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTree = createTree;
var createCommit = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, github.git.createCommit({
                    owner: options.owner,
                    repo: options.repo,
                    message: options.commitMessage,
                    tree: options.tree,
                    parents: options.referenceCommitSha
                        ? [options.referenceCommitSha]
                        : undefined,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, {
                        newCommitSha: res.data.sha,
                    }];
        }
    });
}); };
exports.createCommit = createCommit;
var updateReference = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, github.git.updateRef({
                    owner: options.owner,
                    repo: options.repo,
                    ref: options.ref,
                    sha: options.sha,
                    force: !!options.force,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.updateReference = updateReference;
var createRepository = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, github.rest.repos.createForAuthenticatedUser({
                    name: options.name,
                    auto_init: true,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createRepository = createRepository;
var createRepositoryFromTemplate = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, github.rest.repos.createUsingTemplate({
                    name: options.name,
                    template_owner: options.templateOwner,
                    template_repo: options.templateRepo,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createRepositoryFromTemplate = createRepositoryFromTemplate;
var getBranches = function (github, options) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, github.rest.repos.listBranches({
                    owner: options.owner,
                    repo: options.repo,
                    per_page: 100,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.getBranches = getBranches;
