"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentFile = void 0;
const loadFile_1 = require("../loadFile");
const page_1 = require("../page");
const constants_1 = require("../constants");
function getDocumentFile({ options, }) {
    const customDocumentFile = page_1.getPageFileIfExists({
        options,
        pagePath: constants_1.DOCUMENT_PATH,
    });
    if (customDocumentFile) {
        return customDocumentFile;
    }
    return getDefaultDocumentFile();
}
exports.getDocumentFile = getDocumentFile;
function getDefaultDocumentFile() {
    return loadFile_1.loadFile({
        absolutePath: 'next/document',
    });
}
