"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageObject = void 0;
const getRouteInfo_1 = __importDefault(require("./getRouteInfo"));
const page_1 = require("../page");
const _error_1 = require("../_error");
const _404_1 = require("../404");
const getNextFiles_1 = require("../getNextFiles");
async function getPageObject({ options, }) {
    const routeInfo = await getRouteInfo_1.default({ options });
    if (routeInfo) {
        const { pagePath } = routeInfo;
        const absolutePagePath = page_1.getPagePath({ pagePath, options });
        const files = getNextFiles_1.loadExistingPageFiles({
            absolutePagePath,
            options,
        });
        if (!files.client.pageFile.default) {
            throw new _error_1.InternalError('No default export found for given route');
        }
        return {
            type: 'found',
            ...routeInfo,
            absolutePagePath,
            files,
        };
    }
    // Make a NotFoundPageObject for 404 page
    return _404_1.makeNotFoundPageObject({ options });
}
exports.getPageObject = getPageObject;
