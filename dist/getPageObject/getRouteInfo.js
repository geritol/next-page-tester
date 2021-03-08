"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPagePaths_1 = __importDefault(require("./getPagePaths"));
const makeRouteInfo_1 = require("./makeRouteInfo");
const pagePathParser_1 = require("./pagePathParser");
const utils_1 = require("../utils");
async function getRouteInfo({ options, }) {
    const { route } = options;
    const { pathname } = utils_1.parseRoute({ route });
    const pagePaths = await getPagePaths_1.default({ options });
    for (const pagePath of pagePaths) {
        const pagePathRegex = pagePathParser_1.pagePathToRouteRegex(pagePath);
        const result = pathname.match(pagePathRegex);
        if (result) {
            return makeRouteInfo_1.makeRouteInfo({
                route,
                pagePath,
                routeRegexCaptureGroups: result.groups,
            });
        }
    }
}
exports.default = getRouteInfo;
