"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNotFoundPageObject = void 0;
const index_1 = require("./index");
const utils_1 = require("../utils");
const getPageObject_1 = require("../getPageObject");
const getNextFiles_1 = require("../getNextFiles");
// @NOTE we currently set pagePath as current path name, but it should
// be the path of the currently rendered page file
function makeNotFoundPageObject({ options, }) {
    const { route } = options;
    const { pathname } = utils_1.parseRoute({ route });
    const notFoundPageRouteInfo = getPageObject_1.makeRouteInfo({
        route,
        pagePath: pathname,
    });
    const absolutePagePath = index_1.get404PagePath({ options });
    return {
        ...notFoundPageRouteInfo,
        type: 'notFound',
        absolutePagePath,
        files: getNextFiles_1.loadErrorPageFiles({ absolutePagePath, options }),
    };
}
exports.makeNotFoundPageObject = makeNotFoundPageObject;
