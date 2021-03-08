"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorPagePath = void 0;
const page_1 = require("../page");
const constants_1 = require("../constants");
const defaultErrorPagePath = 'next/error';
function getErrorPagePath({ options, }) {
    const customErrorFile = page_1.getPagePathIfExists({
        pagePath: constants_1.ERROR_PATH,
        options,
    });
    if (customErrorFile) {
        return customErrorFile;
    }
    return defaultErrorPagePath;
}
exports.getErrorPagePath = getErrorPagePath;
