"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEnhancedApp = void 0;
const react_1 = __importDefault(require("react"));
function renderApp({ options, pageObject, pageProps, }) {
    const { env } = options;
    const { appFile: { default: AppComponent }, pageFile: { default: PageComponent }, } = pageObject.files[env];
    return renderEnhancedApp({
        App: AppComponent,
        Page: PageComponent,
        pageProps,
        options,
    });
}
exports.default = renderApp;
function renderEnhancedApp({ App, Page, pageProps, options: { wrapper = {} }, }) {
    let UserEnhancedPage = Page;
    if (wrapper.Page) {
        UserEnhancedPage = wrapper.Page(Page);
    }
    return react_1.default.createElement(App, { Component: UserEnhancedPage, pageProps: pageProps });
}
exports.renderEnhancedApp = renderEnhancedApp;
