"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAsIfOnServerSync = exports.executeAsIfOnServer = void 0;
const constants_1 = require("./constants");
const setNextRuntimeConfig_1 = __importDefault(require("./setNextRuntimeConfig"));
const setEnvVars_1 = require("./setEnvVars");
function hideBrowserEnv() {
    const tmpWindow = global.window;
    const tmpDocument = global.document;
    // @ts-expect-error its okay
    delete global.window;
    // @ts-expect-error its okay
    delete global.document;
    setNextRuntimeConfig_1.default({ runtimeEnv: constants_1.RuntimeEnvironment.SERVER });
    setEnvVars_1.setEnvVars({ runtimeEnv: constants_1.RuntimeEnvironment.SERVER });
    return () => {
        global.window = tmpWindow;
        global.document = tmpDocument;
        setNextRuntimeConfig_1.default({ runtimeEnv: constants_1.RuntimeEnvironment.CLIENT });
        setEnvVars_1.setEnvVars({ runtimeEnv: constants_1.RuntimeEnvironment.CLIENT });
    };
}
const executeAsIfOnServer = async (f) => {
    const restoreBrowserEnv = hideBrowserEnv();
    try {
        return await f();
    }
    finally {
        restoreBrowserEnv();
    }
};
exports.executeAsIfOnServer = executeAsIfOnServer;
const executeAsIfOnServerSync = (f) => {
    const restoreBrowserEnv = hideBrowserEnv();
    try {
        return f();
    }
    finally {
        restoreBrowserEnv();
    }
};
exports.executeAsIfOnServerSync = executeAsIfOnServerSync;
