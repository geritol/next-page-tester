"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("../router");
const makeContextObject_1 = require("../fetchData/makeContextObject");
const server_1 = require("../server");
const constants_1 = require("../constants");
async function fetchAppData({ pageObject, options, }) {
    const { env } = options;
    const { files } = pageObject;
    const AppComponent = files[env].appFile.default;
    const { getInitialProps } = AppComponent;
    if (getInitialProps) {
        const { asPath, pathname, query, route, basePath } = router_1.makeRouterMock({
            options,
            pageObject,
        });
        const ctx = {
            // @NOTE AppTree is currently just a stub
            AppTree: react_1.Fragment,
            Component: pageObject.files.client.pageFile.default,
            ctx: makeContextObject_1.makeGetInitialPropsContext({ pageObject, options }),
            // @ts-expect-error incomplete router object
            router: { asPath, pathname, query, route, basePath },
        };
        const appInitialProps = env === constants_1.RuntimeEnvironment.SERVER
            ? await server_1.executeAsIfOnServer(() => getInitialProps(ctx))
            : await getInitialProps(ctx);
        return appInitialProps;
    }
}
exports.default = fetchAppData;
