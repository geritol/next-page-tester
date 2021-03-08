"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageFileIfExists = exports.getPagePathIfExists = exports.getPagePath = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const _error_1 = require("../_error");
const loadFile_1 = require("../loadFile");
// Path only versions
// @TODO Consider renaming getPageAbsolutePath
function getPagePath({ pagePath, options: { pageExtensions, pagesDirectory }, }) {
    // @NOTE Here we have to remove pagePath's leading "/"
    const absolutePath = path_1.default.resolve(pagesDirectory, pagePath.substring(1));
    for (const pageExtension of pageExtensions) {
        const pathWithExtension = absolutePath + `.${pageExtension}`;
        if (fs_1.existsSync(pathWithExtension)) {
            return pathWithExtension;
        }
    }
    throw new _error_1.InternalError("Couldn't find required page file with matching extension");
}
exports.getPagePath = getPagePath;
function getPagePathIfExists(options) {
    try {
        return getPagePath(options);
    }
    catch (e) {
        return undefined;
    }
}
exports.getPagePathIfExists = getPagePathIfExists;
function getPageFileIfExists({ pagePath, options, }) {
    const absolutePath = getPagePathIfExists({ pagePath, options });
    if (!absolutePath) {
        return undefined;
    }
    try {
        return loadFile_1.loadFile({ absolutePath });
    }
    catch (e) {
        const internalEror = new _error_1.InternalError(`Failed to load "${pagePath}" file due to ${e.name}: ${e.message}`);
        internalEror.stack = e.stack;
        throw internalEror;
    }
}
exports.getPageFileIfExists = getPageFileIfExists;
