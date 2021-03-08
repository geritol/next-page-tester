"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const router_context_1 = require("next/dist/next-server/lib/router-context");
const format_url_1 = require("next/dist/next-server/lib/router/utils/format-url");
const makeRouterMock_1 = __importDefault(require("./makeRouterMock"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
function RouterProvider({ pageObject, options, children: initialChildren, makePage, }) {
    const isMounted = utils_1.useMountedState();
    const previousRouteRef = react_1.useRef(pageObject.route);
    const pushHandler = react_1.useCallback(async (url) => {
        const nextRoute = typeof url === 'string' ? url : format_url_1.formatUrl(url);
        const nextOptions = { ...options, route: nextRoute };
        const previousRoute = previousRouteRef.current;
        const { pageElement, pageObject } = await makePage({
            route: nextRoute,
            previousRoute,
            env: constants_1.RuntimeEnvironment.CLIENT,
        });
        previousRouteRef.current = nextRoute;
        const nextRouter = makeRouterMock_1.default({
            options: nextOptions,
            pageObject,
            pushHandler,
        });
        // Avoid errors if page gets unmounted
        if (isMounted()) {
            setState({ router: nextRouter, children: pageElement });
        }
        else {
            console.warn(`[next-page-tester] Un-awaited client side navigation from "${previousRoute}" to "${nextRoute}". This might lead into unexpected bugs and errors.`);
        }
    }, []);
    const [{ children, router }, setState] = react_1.useState(() => ({
        children: initialChildren,
        router: makeRouterMock_1.default({
            options,
            pageObject,
            pushHandler,
        }),
    }));
    return (react_1.default.createElement(router_context_1.RouterContext.Provider, { value: router }, children));
}
exports.default = RouterProvider;
