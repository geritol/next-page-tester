"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const document_1 = __importDefault(require("next/document"));
const server_1 = require("../server");
async function fetchDocumentData({ Document, pageObject, renderPage, }) {
    // @NOTE: Document has always a getInitialProps since inherits from NextDocument
    /* istanbul ignore next */
    const getDocumentInitialProps = Document.getInitialProps || document_1.default.getInitialProps;
    return server_1.executeAsIfOnServer(() => getDocumentInitialProps({
        renderPage,
        pathname: pageObject.pagePath,
        query: pageObject.query,
        AppTree: react_1.Fragment,
    }));
}
exports.default = fetchDocumentData;
