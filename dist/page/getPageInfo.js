"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageInfo = void 0;
const getPageObject_1 = require("../getPageObject");
const fetchData_1 = require("../fetchData");
const _404_1 = require("../404");
const _error_1 = require("../_error");
const utils_1 = require("../utils");
/*
 * Return page info associated with a given path
 */
async function getPageInfo({ options, }) {
    const pageObject = await getPageObject_1.getPageObject({ options });
    if (pageObject.type === 'notFound') {
        if (utils_1.isExternalRoute(pageObject.route)) {
            throw new _error_1.InternalError(`External route: ${pageObject.route}`);
        }
        return _404_1.get404PageInfo({ options });
    }
    const pageData = await fetchData_1.fetchRouteData({ options, pageObject });
    if (pageData.redirect) {
        return getPageInfo({
            options: {
                ...options,
                route: pageData.redirect.destination,
            },
        });
    }
    if (pageData.notFound) {
        return _404_1.get404PageInfo({ options });
    }
    return { pageObject, pageData };
}
exports.getPageInfo = getPageInfo;
