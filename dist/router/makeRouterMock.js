"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// https://github.com/vercel/next.js/issues/7479#issuecomment-659859682
function makeDefaultRouterMock({ pushHandler = () => { }, }) {
    const routerMock = {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: {},
        push: async (url, as, options) => {
            pushHandler(url, as, options);
            return true;
        },
        replace: async (url, as, options) => {
            pushHandler(url, as, options);
            return true;
        },
        reload: () => { },
        back: () => { },
        prefetch: async () => { },
        beforePopState: () => { },
        events: {
            on: () => { },
            off: () => { },
            emit: () => { },
        },
        isFallback: false,
    };
    return routerMock;
}
function makeRouterMock({ options: { router: routerEnhancer }, pageObject: { pagePath, params, route, query }, pushHandler, }) {
    const { pathname, search, hash } = utils_1.parseRoute({ route });
    const router = {
        ...makeDefaultRouterMock({ pushHandler }),
        asPath: pathname + search + hash,
        pathname: utils_1.removeFileExtension({ path: pagePath }),
        query: { ...params, ...query },
        route: utils_1.removeFileExtension({ path: pagePath }),
        basePath: '',
    };
    return routerEnhancer(router);
}
exports.default = makeRouterMock;
