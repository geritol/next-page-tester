"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_config_1 = require("next/dist/next-server/lib/runtime-config");
const constants_1 = require("./constants");
const nextConfig_1 = require("./nextConfig");
function setNextRuntimeConfig({ runtimeEnv, }) {
    const config = nextConfig_1.getNextConfig();
    const { serverRuntimeConfig, publicRuntimeConfig } = config;
    runtime_config_1.setConfig({
        serverRuntimeConfig: runtimeEnv === constants_1.RuntimeEnvironment.SERVER ? serverRuntimeConfig : {},
        publicRuntimeConfig,
    });
}
exports.default = setNextRuntimeConfig;
