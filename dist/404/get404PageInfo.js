"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404PageInfo = void 0;
const fetchData_1 = require("../fetchData");
const makeNotFoundPageObject_1 = require("./makeNotFoundPageObject");
async function get404PageInfo({ options, }) {
    const pageObject = makeNotFoundPageObject_1.makeNotFoundPageObject({ options });
    const pageData = await fetchData_1.fetchPageData({ pageObject, options });
    pageData.props = {
        ...pageData.props,
        statusCode: 404,
    };
    return { pageData, pageObject };
}
exports.get404PageInfo = get404PageInfo;
