"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePageElement = void 0;
const getPageInfo_1 = require("./getPageInfo");
const _app_1 = require("../_app");
async function makePageElement({ options, }) {
    const { pageData, pageObject } = await getPageInfo_1.getPageInfo({ options });
    const pageElement = _app_1.renderApp({
        options,
        pageObject,
        pageProps: pageData.props,
    });
    return { pageElement, pageObject };
}
exports.makePageElement = makePageElement;
