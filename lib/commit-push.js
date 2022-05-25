"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.commitAndPushForInitRepo = void 0;
var api = __importStar(require("./api"));
var _ = __importStar(require("@hemyn/utils-node"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var GitignoreParser = __importStar(require("gitignore-parser"));
var console_1 = require("console");
var branch_1 = require("./branch");
var commitAndPushForInitRepo = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var github, fileList, gitignoreFile, validFileList, gitignore_1, branch, ref, referenceCommit, tree, commit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                github = options.github;
                return [4 /*yield*/, _.listFiles(options.cwd)];
            case 1:
                fileList = _a.sent();
                gitignoreFile = fileList.find(function (item) { return item.endsWith(".gitignore"); });
                if (gitignoreFile) {
                    gitignore_1 = GitignoreParser.compile(fs_1.default.readFileSync(gitignoreFile, "utf8"));
                    validFileList = fileList.filter(function (file) {
                        return gitignore_1.accepts(path_1.default.relative(options.cwd, file));
                    });
                }
                else {
                    validFileList = fileList;
                }
                if (!(validFileList === null || validFileList === void 0 ? void 0 : validFileList.length)) return [3 /*break*/, 7];
                return [4 /*yield*/, branch_1.checkBranch({
                        owner: options.owner,
                        repo: options.repo,
                        branch: options.branch,
                        github: github,
                    })];
            case 2:
                branch = _a.sent();
                console_1.assert(!!branch, "Invalid branch.");
                ref = "heads/" + (branch === null || branch === void 0 ? void 0 : branch.name);
                return [4 /*yield*/, api.getReferenceCommit(github, {
                        owner: options.owner,
                        repo: options.repo,
                        ref: ref,
                    })];
            case 3:
                referenceCommit = _a.sent();
                return [4 /*yield*/, api.createTree(github, {
                        owner: options.owner,
                        repo: options.repo,
                        files: validFileList.map(function (item) {
                            console.log(path_1.default.relative(options.cwd, item));
                            return {
                                path: path_1.default.relative(options.cwd, item),
                                content: fs_1.default.readFileSync(item, "utf8"),
                            };
                        }),
                        referenceCommitSha: referenceCommit === null || referenceCommit === void 0 ? void 0 : referenceCommit.object.sha,
                    })];
            case 4:
                tree = _a.sent();
                return [4 /*yield*/, api.createCommit(github, {
                        owner: options.owner,
                        repo: options.repo,
                        commitMessage: options.commitMessage,
                        tree: tree,
                        referenceCommitSha: referenceCommit === null || referenceCommit === void 0 ? void 0 : referenceCommit.object.sha,
                    })];
            case 5:
                commit = _a.sent();
                return [4 /*yield*/, api.updateReference(github, {
                        owner: options.owner,
                        repo: options.repo,
                        ref: ref,
                        sha: commit.newCommitSha,
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.commitAndPushForInitRepo = commitAndPushForInitRepo;
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.commitAndPushForInitRepo(options)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
