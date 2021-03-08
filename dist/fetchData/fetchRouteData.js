"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchPageData_1 = __importDefault(require("./fetchPageData"));
const _app_1 = require("../_app");
async function fetchRouteData({ pageObject, options, }) {
    const appInitialProps = await _app_1.fetchAppData({
        pageObject,
        options,
    });
    const pageData = await fetchPageData_1.default({
        pageObject,
        options,
        appInitialProps,
    });
    return pageData;
}
exports.default = fetchRouteData;
