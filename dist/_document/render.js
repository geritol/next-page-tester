"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fetchDocumentData_1 = __importDefault(require("./fetchDocumentData"));
const constants_1 = require("../constants");
const server_1 = require("react-dom/server");
const head_manager_context_1 = require("next/dist/next-server/lib/head-manager-context");
const _app_1 = require("../_app");
const server_2 = require("../server");
// Copied from next.js
// https://github.com/vercel/next.js/blob/b944b06f30322076ceb9020c10cb9bf3448d2659/packages/next/next-server/server/render.tsx#L127
function enhanceComponents(options, App, Component) {
    // For backwards compatibility
    if (typeof options === 'function') {
        return {
            App,
            Component: options(Component),
        };
    }
    return {
        App: options.enhanceApp ? options.enhanceApp(App) : App,
        Component: options.enhanceComponent
            ? options.enhanceComponent(Component)
            : Component,
    };
}
async function serverRenderDocument({ options, pageProps, pageObject, wrapWithRouter, }) {
    return server_2.executeAsIfOnServer(async () => {
        const { useDocument } = options;
        const { documentFile: { default: DocumentComponent }, appFile: { default: AppComponent }, pageFile: { default: PageComponent }, } = pageObject.files.server;
        const render = (App, Page) => {
            return _app_1.renderEnhancedApp({ App, Page, options, pageProps });
        };
        // Return an empty dummy document if useDocument is not enabled
        if (!useDocument) {
            return (react_1.default.createElement("html", null,
                react_1.default.createElement("head", null),
                react_1.default.createElement("body", null,
                    react_1.default.createElement("div", { id: constants_1.NEXT_ROOT_ELEMENT_ID }, wrapWithRouter(render(AppComponent, PageComponent))))));
        }
        const renderPage = (options = {}) => {
            const { App: EnhancedApp, Component: EnhancedComponent, } = enhanceComponents(options, AppComponent, PageComponent);
            let head = [];
            const html = server_1.renderToString(
            // @NOTE: implemented from:
            // https://github.com/vercel/next.js/blob/v10.0.3/packages/next/next-server/server/render.tsx#L561
            react_1.default.createElement(head_manager_context_1.HeadManagerContext.Provider, { value: {
                    updateHead: (state) => {
                        head = state;
                    },
                    mountedInstances: new Set(),
                } }, wrapWithRouter(render(EnhancedApp, EnhancedComponent))));
            return { html, head };
        };
        const initialProps = await fetchDocumentData_1.default({
            Document: DocumentComponent,
            renderPage,
            pageObject,
        });
        const documentProps = {
            ...initialProps,
            buildManifest: {
                ampDevFiles: [],
                ampFirstPages: [],
                devFiles: [],
                lowPriorityFiles: [],
                polyfillFiles: [],
                pages: {
                    [constants_1.APP_PATH]: [],
                    [pageObject.pagePath]: [],
                },
            },
            __NEXT_DATA__: {
                page: pageObject.pagePath,
                query: pageObject.query,
                buildId: 'next-page-tester',
                props: { pageProps },
            },
            scriptLoader: {},
            docComponentsRendered: {},
            dangerousAsPath: '',
            ampPath: '',
            inAmpMode: false,
            dynamicImports: [],
            isDevelopment: false,
            hybridAmp: false,
            canonicalBase: '',
            headTags: [],
            devOnlyCacheBusterQueryString: '',
        };
        return DocumentComponent.renderDocument(DocumentComponent, documentProps);
    });
}
exports.default = serverRenderDocument;
