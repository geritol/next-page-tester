"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
const react_1 = __importDefault(require("react"));
const fs_1 = require("fs");
const page_1 = require("./page");
const makeRenderMethods_1 = require("./makeRenderMethods");
const router_1 = require("./router");
const _document_1 = require("./_document");
const _app_1 = require("./_app");
const head_manager_1 = __importDefault(require("next/dist/client/head-manager"));
const head_manager_context_1 = require("next/dist/next-server/lib/head-manager-context");
const nextConfig_1 = require("./nextConfig");
const setNextRuntimeConfig_1 = __importDefault(require("./setNextRuntimeConfig"));
const setEnvVars_1 = require("./setEnvVars");
const utils_1 = require("./utils");
const _error_1 = require("./_error");
const constants_1 = require("./constants");
function validateOptions({ nextRoot, route }) {
    if (!route.startsWith('/')) {
        throw new _error_1.InternalError('"route" option should start with "/"');
    }
    if (!fs_1.existsSync(nextRoot)) {
        throw new _error_1.InternalError('Cannot find "nextRoot" directory under: ${nextRoot}');
    }
}
async function getPage({ route, nextRoot = utils_1.defaultNextRoot, req = (req) => req, res = (res) => res, router = (router) => router, useApp = true, useDocument = false, dotenvFile, wrapper, sharedModules = [], }) {
    const optionsWithDefaults = {
        route,
        nextRoot,
        req,
        res,
        router,
        useApp,
        useDocument,
        dotenvFile,
        wrapper,
        sharedModules,
    };
    validateOptions(optionsWithDefaults);
    setEnvVars_1.loadBaseEnvironment({ nextRoot, dotenvFile });
    await nextConfig_1.loadNextConfig({ nextRoot });
    setNextRuntimeConfig_1.default({ runtimeEnv: constants_1.RuntimeEnvironment.CLIENT });
    setEnvVars_1.setEnvVars({ runtimeEnv: constants_1.RuntimeEnvironment.CLIENT });
    const options = {
        ...optionsWithDefaults,
        pagesDirectory: utils_1.findPagesDirectory({ nextRoot }),
        pageExtensions: utils_1.getPageExtensions(),
        env: constants_1.RuntimeEnvironment.SERVER,
    };
    // @TODO: Consider printing extended options value behind a debug flag
    const headManager = useDocument && head_manager_1.default();
    const makePage = async (options) => {
        let { pageElement, pageObject } = await page_1.makePageElement({ options });
        if (useDocument &&
            options.env === constants_1.RuntimeEnvironment.CLIENT &&
            headManager) {
            pageElement = (react_1.default.createElement(head_manager_context_1.HeadManagerContext.Provider, { value: headManager }, pageElement));
        }
        return { pageObject, pageElement };
    };
    const { pageData, pageObject } = await page_1.getPageInfo({ options });
    const wrapWithRouter = (children) => {
        return (react_1.default.createElement(router_1.RouterProvider, { options: options, pageObject: pageObject, makePage: (optionsOverrides) => makePage({ ...options, ...optionsOverrides }) }, children));
    };
    const serverPageElement = await _document_1.serverRenderDocument({
        options,
        pageObject,
        wrapWithRouter,
        pageProps: pageData.props,
    });
    const clientPageElement = wrapWithRouter(_app_1.renderApp({
        options: { ...options, env: constants_1.RuntimeEnvironment.CLIENT },
        pageObject,
        pageProps: pageData.props,
    }));
    return {
        page: clientPageElement,
        ...makeRenderMethods_1.makeRenderMethods({ serverPageElement, clientPageElement }),
    };
}
exports.default = getPage;
