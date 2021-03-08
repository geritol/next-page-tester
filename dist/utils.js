"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalRoute = exports.parseHTML = exports.executeWithFreshModules = exports.preservePredefinedSharedModulesIdentity = exports.useMountedState = exports.getPageExtensions = exports.findPagesDirectory = exports.defaultNextRoot = exports.removeFileExtension = exports.stringifyQueryString = exports.parseQueryString = exports.parseRoute = void 0;
const url_1 = require("url");
const react_1 = require("react");
const querystring_1 = __importDefault(require("querystring"));
const find_root_1 = __importDefault(require("find-root"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const stealthy_require_1 = __importDefault(require("stealthy-require"));
const nextConfig_1 = require("./nextConfig");
const _error_1 = require("./_error");
function parseRoute({ route }) {
    const urlObject = new url_1.URL(`http://test.com${route}`);
    const { pathname } = urlObject;
    /*
     * Next.js redirects by default routes with trailing slash to the counterpart without trailing slash
     * @NOTE: Here we might handle Next.js trailingSlash option
     * https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
     */
    if (pathname.endsWith('/') && pathname !== '/') {
        urlObject.pathname = pathname.slice(0, -1);
    }
    return urlObject;
}
exports.parseRoute = parseRoute;
function parseQueryString({ queryString, }) {
    const qs = queryString.startsWith('?')
        ? queryString.substring(1)
        : queryString;
    return querystring_1.default.parse(qs);
}
exports.parseQueryString = parseQueryString;
function stringifyQueryString({ object, leadingQuestionMark, }) {
    const queryString = querystring_1.default.stringify(object);
    if (leadingQuestionMark && queryString) {
        return '?' + queryString;
    }
    return queryString;
}
exports.stringifyQueryString = stringifyQueryString;
function removeFileExtension({ path }) {
    return path.replace(/\.[^/.]+$/, '');
}
exports.removeFileExtension = removeFileExtension;
exports.defaultNextRoot = find_root_1.default(process.cwd());
function findPagesDirectory({ nextRoot }) {
    const pagesPaths = [
        path_1.default.join(nextRoot, 'pages'),
        path_1.default.join(nextRoot, 'src', 'pages'),
    ];
    for (const path of pagesPaths) {
        if (fs_1.existsSync(path)) {
            return path;
        }
    }
    throw new _error_1.InternalError(`Cannot find "pages" directory under: ${nextRoot}`);
}
exports.findPagesDirectory = findPagesDirectory;
function getPageExtensions() {
    const config = nextConfig_1.getNextConfig();
    return config.pageExtensions;
}
exports.getPageExtensions = getPageExtensions;
function useMountedState() {
    const mountedRef = react_1.useRef(false);
    const get = react_1.useCallback(() => mountedRef.current, []);
    react_1.useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });
    return get;
}
exports.useMountedState = useMountedState;
// @NOTE: It is crucial that these modules preserve their identity between client and server
// for document rendering to work correctly. For things to kick in early enough in the process we
// mark them as such in testHelpers.
const predefinedSharedModules = [
    'react',
    'next/dist/next-server/lib/head-manager-context',
    'next/dist/next-server/lib/router-context',
    'next/dist/next-server/lib/runtime-config',
];
function preserveJestSharedModulesIdentity(modules) {
    for (const moduleName of modules) {
        // @NOTE for some reason Jest needs us to pre-import the modules
        // we want to require with jest.requireActual
        require(moduleName);
        jest.mock(moduleName, () => jest.requireActual(moduleName));
    }
}
function preservePredefinedSharedModulesIdentity() {
    preserveJestSharedModulesIdentity(predefinedSharedModules);
}
exports.preservePredefinedSharedModulesIdentity = preservePredefinedSharedModulesIdentity;
function executeWithFreshModules(f, { sharedModules }) {
    /* istanbul ignore else */
    if (typeof jest !== 'undefined') {
        let result;
        preserveJestSharedModulesIdentity(sharedModules);
        jest.isolateModules(() => {
            result = f();
        });
        // @ts-expect-error result is surely defined here
        return result;
    }
    // @NOTE this branch will never be execute by Jest
    else {
        return stealthy_require_1.default(require.cache, f, () => {
            for (const moduleName of [
                ...predefinedSharedModules,
                ...sharedModules,
            ]) {
                require(moduleName);
            }
        }, module);
    }
}
exports.executeWithFreshModules = executeWithFreshModules;
const parseHTML = (html) => {
    const domParser = new DOMParser();
    return domParser.parseFromString(html, 'text/html');
};
exports.parseHTML = parseHTML;
const ABSOLUTE_URL_REGEXP = new RegExp('^(?:[a-z]+:)?//', 'i');
function isExternalRoute(route) {
    return Boolean(route.match(ABSOLUTE_URL_REGEXP));
}
exports.isExternalRoute = isExternalRoute;
