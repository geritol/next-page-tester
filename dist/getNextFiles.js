"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadErrorPageFiles = exports.loadExistingPageFiles = void 0;
const _document_1 = require("./_document");
const _app_1 = require("./_app");
const loadFile_1 = require("./loadFile");
const utils_1 = require("./utils");
const server_1 = require("./server");
// Get Document, App and Page files
function loadPageFiles({ absolutePagePath, options, }) {
    return {
        documentFile: _document_1.getDocumentFile({ options }),
        appFile: _app_1.getAppFile({ options }),
        pageFile: loadFile_1.loadFile({
            absolutePath: absolutePagePath,
        }),
    };
}
function loadExistingPageFiles({ absolutePagePath, options, }) {
    return {
        client: loadPageFiles({ absolutePagePath, options }),
        server: server_1.executeAsIfOnServerSync(() => utils_1.executeWithFreshModules(() => loadPageFiles({ absolutePagePath, options }), options)),
    };
}
exports.loadExistingPageFiles = loadExistingPageFiles;
function loadErrorPageFiles({ absolutePagePath, options, }) {
    return {
        client: loadPageFiles({ absolutePagePath, options }),
        server: server_1.executeAsIfOnServerSync(() => utils_1.executeWithFreshModules(() => loadPageFiles({ absolutePagePath, options }), options)),
    };
}
exports.loadErrorPageFiles = loadErrorPageFiles;
