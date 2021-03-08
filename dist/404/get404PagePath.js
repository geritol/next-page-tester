"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404PagePath = void 0;
const page_1 = require("../page");
const constants_1 = require("../constants");
const _error_1 = require("../_error");
function get404PagePath({ options, }) {
    const custom404file = page_1.getPagePathIfExists({
        pagePath: constants_1.FOUR_O_FOUR_PATH,
        options,
    });
    if (custom404file) {
        return custom404file;
    }
    // Fallback to "/pages/_error" if no "/pages/404" is present
    return _error_1.getErrorPagePath({ options });
}
exports.get404PagePath = get404PagePath;
