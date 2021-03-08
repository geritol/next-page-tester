"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const normalize_path_1 = __importDefault(require("normalize-path"));
const sorted_routes_1 = require("next/dist/next-server/lib/router/utils/sorted-routes");
// Returns available page paths without file extension
async function getPagePaths({ options: { pagesDirectory, pageExtensions }, }) {
    const files = await fast_glob_1.default([
        normalize_path_1.default(path_1.default.join(pagesDirectory, '**', '*')),
    ]);
    const extensionsRegex = new RegExp(`.(${pageExtensions.join('|')})$`);
    return sorted_routes_1.getSortedRoutes(files
        // Make page paths relative
        .map((filePath) => filePath.replace(normalize_path_1.default(pagesDirectory), ''))
        // Filter out files with non-allowed extensions
        .filter((filePath) => filePath.match(extensionsRegex))
        // Strip file extensions
        .map((filePath) => filePath.replace(extensionsRegex, ''))
        // Filter out /api folder
        .filter((filePath) => !filePath.startsWith('/api/'))
        // Filter out /_app and /_document files
        .filter((filePath) => filePath !== '/_app' && filePath !== '/_document'));
}
exports.default = getPagePaths;
