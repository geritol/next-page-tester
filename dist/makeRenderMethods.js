"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupDOM = exports.makeRenderMethods = void 0;
const react_dom_1 = __importDefault(require("react-dom"));
const server_1 = __importDefault(require("react-dom/server"));
const constants_1 = require("./constants");
const server_2 = require("./server");
const utils_1 = require("./utils");
const _error_1 = require("./_error");
function makeRenderMethods({ serverPageElement, clientPageElement, }) {
    function serverRenderToString() {
        return {
            html: server_2.executeAsIfOnServerSync(() => server_1.default.renderToString(serverPageElement)),
        };
    }
    // Update whole document content with SSR html
    function serverRender() {
        const { html } = serverRenderToString();
        const originalBody = document.body;
        const newDocument = utils_1.parseHTML(html);
        document.replaceChild(newDocument.documentElement, document.documentElement);
        // Replace new body element with original one
        // @NOTE we have to preserve document.body element identity
        // to not break @testing-library global "screen" object
        const bodyContent = document.body.childNodes;
        originalBody.append(...bodyContent);
        document.documentElement.replaceChild(originalBody, document.body);
        const nextRoot = document.getElementById(constants_1.NEXT_ROOT_ELEMENT_ID);
        /* istanbul ignore next */
        if (!nextRoot) {
            throw new _error_1.InternalError(`Missing ${constants_1.NEXT_ROOT_ELEMENT_ID} div`);
        }
        return { nextRoot };
    }
    function render() {
        const { nextRoot } = serverRender();
        // Hydrate page element in existing DOM
        react_dom_1.default.hydrate(clientPageElement, nextRoot);
        return { nextRoot };
    }
    return {
        serverRenderToString,
        serverRender,
        render,
    };
}
exports.makeRenderMethods = makeRenderMethods;
function cleanupDOM() {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    // Cleanup html root element attributes
    const html = document.documentElement;
    while (html.attributes.length > 0) {
        html.removeAttribute(html.attributes[0].name);
    }
}
exports.cleanupDOM = cleanupDOM;
