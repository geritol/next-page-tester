"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRouteInfo = void 0;
const pagePathParser_1 = require("./pagePathParser");
const utils_1 = require("../utils");
function makeRouteInfo({ route, pagePath, routeRegexCaptureGroups, }) {
    const { pathname, search } = utils_1.parseRoute({ route });
    const params = makeParamsObject({
        pagePath,
        routeRegexCaptureGroups,
    });
    const query = utils_1.parseQueryString({ queryString: search });
    return {
        route,
        params,
        query,
        pagePath,
        resolvedUrl: pathname +
            utils_1.stringifyQueryString({
                object: { ...params, ...query },
                leadingQuestionMark: true,
            }),
    };
}
exports.makeRouteInfo = makeRouteInfo;
function makeParamsObject({ pagePath, routeRegexCaptureGroups, }) {
    const params = {};
    const pagePathParams = pagePathParser_1.extractPagePathParamsType({
        pagePath,
    });
    if (routeRegexCaptureGroups) {
        for (const [key, value] of Object.entries(routeRegexCaptureGroups)) {
            if (value !== undefined) {
                const paramType = pagePathParams[key];
                if (paramType === pagePathParser_1.ROUTE_PARAMS_TYPES.CATCH_ALL ||
                    paramType === pagePathParser_1.ROUTE_PARAMS_TYPES.OPTIONAL_CATCH_ALL) {
                    params[key] = value.split('/');
                }
                else {
                    params[key] = value;
                }
            }
        }
    }
    return params;
}
