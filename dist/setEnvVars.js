"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupEnvVars = exports.loadBaseEnvironment = exports.setEnvVars = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const nextConfig_1 = require("./nextConfig");
const constants_1 = require("./constants");
const { SERVER, CLIENT } = constants_1.RuntimeEnvironment;
const CLIENT_PASSTHROUGH_VARS = new Set(['NODE_ENV']);
function scopeEnvVarsByEnvironment(vars) {
    const serverVars = { ...vars };
    const clientVars = { ...vars };
    for (const varName in vars) {
        if (CLIENT_PASSTHROUGH_VARS.has(varName)) {
            continue;
        }
        if (!varName.startsWith('NEXT_PUBLIC_')) {
            delete clientVars[varName];
        }
    }
    return { [SERVER]: serverVars, [CLIENT]: clientVars };
}
// @NOTE Next.js env var handling implementation is available here:
// https://github.com/vercel/next.js/tree/v10.0.5/test/integration/env-config
// We can't use it as long as this doesn't get fixed:
// https://github.com/vercel/next.js/issues/21296
function loadDotFile({ nextRoot, dotenvFile: dotenvFileRelativePath, }) {
    if (!dotenvFileRelativePath) {
        return {};
    }
    const dotenvFilePath = path_1.default.resolve(nextRoot, dotenvFileRelativePath);
    if (fs_1.existsSync(dotenvFilePath)) {
        const dotenvResult = dotenv_expand_1.default({
            parsed: dotenv_1.default.parse(fs_1.readFileSync(dotenvFilePath)),
            // @ts-expect-error dotenv-expand type definition is out of date
            ignoreProcessEnv: true,
        });
        /* istanbul ignore if */
        if (!dotenvResult.parsed) {
            return {};
        }
        return dotenvResult.parsed;
    }
    else {
        console.warn(`[next-page-tester] Cannot find env file at path: ${dotenvFilePath}`);
        return {};
    }
}
const originalEnvVars = process.env;
let baseEnvVars = originalEnvVars;
function setEnvVars({ runtimeEnv, }) {
    const { env: envVarsFromConfig } = nextConfig_1.getNextConfig();
    // Runtime and dotfile env vars are scoped by environment (via NEXT_PUBLIC_ prefix),
    // while env vars coming from next.config.js are available in both environments
    process.env = {
        ...scopeEnvVarsByEnvironment(baseEnvVars)[runtimeEnv],
        ...envVarsFromConfig,
    };
}
exports.setEnvVars = setEnvVars;
function loadBaseEnvironment({ nextRoot, dotenvFile, }) {
    const dotenv = loadDotFile({ nextRoot, dotenvFile });
    baseEnvVars = { ...dotenv, ...process.env };
    process.env = baseEnvVars;
}
exports.loadBaseEnvironment = loadBaseEnvironment;
function cleanupEnvVars() {
    if (process.env !== originalEnvVars) {
        process.env = originalEnvVars;
    }
}
exports.cleanupEnvVars = cleanupEnvVars;
