"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextConfig = exports.loadNextConfig = void 0;
const config_1 = __importDefault(require("next/dist/next-server/server/config"));
const constants_1 = require("next/constants");
const _error_1 = require("./_error");
let nextConfig;
async function loadNextConfig({ nextRoot }) {
    nextConfig = await config_1.default(constants_1.PHASE_DEVELOPMENT_SERVER, nextRoot);
}
exports.loadNextConfig = loadNextConfig;
/*
 * Retrieve Next.js config using Next.js internals
 * https://github.com/vercel/next.js/blob/v10.0.1/test/isolated/config.test.js#L12
 *
 * Default config:
 * https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config.ts
 */
function getNextConfig() {
    /* istanbul ignore if */
    if (!nextConfig) {
        throw new _error_1.InternalError('getNextConfig called before loadNextConfig');
    }
    return nextConfig;
}
exports.getNextConfig = getNextConfig;
