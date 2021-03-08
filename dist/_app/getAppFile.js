"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppFile = void 0;
const path_1 = __importDefault(require("path"));
const loadFile_1 = require("../loadFile");
const page_1 = require("../page");
const constants_1 = require("../constants");
function getAppFile({ options, }) {
    const { useApp } = options;
    if (useApp) {
        const customAppFile = page_1.getPageFileIfExists({
            pagePath: constants_1.APP_PATH,
            options,
        });
        if (customAppFile) {
            return customAppFile;
        }
    }
    return getDefaultAppFile();
}
exports.getAppFile = getAppFile;
function getDefaultAppFile() {
    return loadFile_1.loadFile({
        absolutePath: path_1.default.resolve(__dirname, 'DefaultApp'),
    });
}
