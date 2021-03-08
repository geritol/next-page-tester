"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStaticPropsContext = exports.makeGetServerSidePropsContext = exports.makeGetInitialPropsContext = void 0;
const react_1 = require("react");
const cookie_1 = require("cookie");
const makeHttpObjects_1 = __importDefault(require("./makeHttpObjects"));
function makeGetInitialPropsContext({ pageObject, options: { req: reqMocker, res: resMocker, previousRoute, env }, }) {
    const { pagePath, params, route, query } = pageObject;
    const ctx = {
        // @NOTE AppTree is currently just a stub
        AppTree: react_1.Fragment,
        pathname: pagePath,
        query: { ...params, ...query },
        asPath: route,
    };
    if (env === 'server') {
        const { req, res } = makeHttpObjects_1.default({
            pageObject,
            reqMocker,
            resMocker,
            refererRoute: previousRoute,
        });
        ctx.req = req;
        ctx.res = res;
    }
    return ctx;
}
exports.makeGetInitialPropsContext = makeGetInitialPropsContext;
function makeGetServerSidePropsContext({ pageObject, options: { req: reqMocker, res: resMocker, previousRoute }, }) {
    const { params, query, resolvedUrl } = pageObject;
    const { req, res } = makeHttpObjects_1.default({
        pageObject,
        reqMocker,
        resMocker,
        refererRoute: previousRoute,
    });
    // parsed "cookies" are only available in "getServerSideProps" data fetching method
    // https://github.com/vercel/next.js/pull/19724/files#diff-f1cccfe490138be7dae0d63562f6a2834af92d21130e0ff10d6de7ad30613f6bR132
    if (req.headers.cookie) {
        req.cookies = cookie_1.parse(req.headers.cookie);
    }
    // @TODO complete ctx object
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
        params: { ...params },
        query: { ...query },
        resolvedUrl,
        req,
        res,
    };
}
exports.makeGetServerSidePropsContext = makeGetServerSidePropsContext;
function makeStaticPropsContext({ pageObject, }) {
    const { params } = pageObject;
    // @TODO complete ctx object
    // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
    return {
        params: { ...params },
    };
}
exports.makeStaticPropsContext = makeStaticPropsContext;
