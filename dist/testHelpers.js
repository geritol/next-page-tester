"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.initTestHelpers = void 0;
const makeRenderMethods_1 = require("./makeRenderMethods");
const setEnvVars_1 = require("./setEnvVars");
const utils_1 = require("./utils");
function isJSDOMEnvironment() {
    return navigator && navigator.userAgent.includes('jsdom');
}
class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
function initTestHelpers() {
    if (isJSDOMEnvironment()) {
        // Mock IntersectionObserver (Link component relies on it)
        if (!global.IntersectionObserver) {
            //@ts-expect-error missing DOM types
            global.IntersectionObserver = IntersectionObserver;
        }
        // Mock window.scrollTo (Link component triggers it)
        global.scrollTo = () => { };
    }
    if (typeof document !== 'undefined' && typeof afterEach === 'function') {
        afterEach(cleanup);
    }
    // We are intentionally only targeting jest here for it to work with jest.isolatedModules
    // If user has a different test runner we handle it in src/utils where we fallback to stealthy-require
    if (typeof jest !== 'undefined') {
        utils_1.preservePredefinedSharedModulesIdentity();
    }
}
exports.initTestHelpers = initTestHelpers;
function cleanup() {
    makeRenderMethods_1.cleanupDOM();
    setEnvVars_1.cleanupEnvVars();
}
exports.cleanup = cleanup;
