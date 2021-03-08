"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/* TODO: we should be using DefaultApp from next/app as it has some custom logic */
const DefaultApp = function DefaultApp({ Component, pageProps }) {
    return react_1.default.createElement(Component, Object.assign({}, pageProps));
};
exports.default = DefaultApp;
