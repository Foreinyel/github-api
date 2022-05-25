"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rm = void 0;
var rimraf_1 = __importDefault(require("rimraf"));
var rm = function (dest) {
    return new Promise(function (resolve) {
        rimraf_1.default(dest, function () {
            resolve(true);
        });
    });
};
exports.rm = rm;
