"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeContextObject_1 = require("./makeContextObject");
const server_1 = require("../server");
const _error_1 = require("../_error");
const constants_1 = require("../constants");
function ensureNoMultipleDataFetchingMethods({ page, }) {
    let methodsCounter = 0;
    if (page.getServerSideProps) {
        methodsCounter++;
    }
    if (page.getStaticProps) {
        methodsCounter++;
    }
    if (page.default.getInitialProps) {
        methodsCounter++;
    }
    if (methodsCounter > 1) {
        throw new _error_1.InternalError('Only one data fetching method is allowed');
    }
}
// Pages' fetching methods may return "notFound" and "redirect" object
function ensurePageDataHasProps({ pageData, }) {
    const allowedKeys = ['props', 'redirect', 'notFound'];
    for (const key of allowedKeys) {
        if (key in pageData) {
            return;
        }
    }
    const errorMessage = `[next-page-tester] Page's fetching method returned an object with unsupported fields. Supported fields are: "[${allowedKeys.join(', ')}]". Returned value is available in error.payload.`;
    const error = new Error(errorMessage);
    error.payload = pageData;
    throw error;
}
function mergePageDataWithAppData({ pageData, appInitialProps, }) {
    const { props: pageProps, ...restOfPageData } = pageData;
    //appInitialProps.pageProps gets merged with pageData.props
    return {
        props: {
            ...appInitialProps === null || appInitialProps === void 0 ? void 0 : appInitialProps.pageProps,
            ...pageProps,
        },
        ...restOfPageData,
    };
}
/*
 * fetchPageData behaves differently depending on whether custom /_app
 * fetches data or not (appInitialProps)
 *
 * /_app HAS NOT fetched data:
 * fetch page data using the first available method:
 * - getInitialProps
 * - getServerSideProps
 * - getStaticProps
 *
 * /_app HAS fetched data:
 * DO NOT call getInitialProps, if available
 * If available, call getServerSideProps or getServerSideProps
 * and merge returned object's prop property with appInitialProps.pageProps
 *
 * If no fetching methods available, return appInitialProps.pageProps as {props: appInitialProps.pageProp}
 */
async function fetchPageData({ pageObject, appInitialProps, options, }) {
    const { env } = options;
    const { files } = pageObject;
    const pageFile = files[env].pageFile;
    ensureNoMultipleDataFetchingMethods({ page: pageFile });
    const pageComponent = pageFile.default;
    const { getInitialProps } = pageComponent;
    if (getInitialProps &&
        // getInitialProps is not called when custom App has the same method
        !appInitialProps) {
        const ctx = makeContextObject_1.makeGetInitialPropsContext({
            options,
            pageObject,
        });
        if (env === constants_1.RuntimeEnvironment.CLIENT) {
            const initialProps = await getInitialProps(ctx);
            return { props: initialProps };
        }
        else {
            const initialProps = await server_1.executeAsIfOnServer(() => getInitialProps(ctx));
            return { props: initialProps };
        }
    }
    // Data fetching methods available to actual pages only
    if (pageObject.type === 'found') {
        const { files, params } = pageObject;
        const serverPageFile = files.server.pageFile;
        if (serverPageFile.getServerSideProps) {
            const { getServerSideProps } = serverPageFile;
            const ctx = makeContextObject_1.makeGetServerSidePropsContext({ options, pageObject });
            const pageData = await server_1.executeAsIfOnServer(() => getServerSideProps(ctx));
            ensurePageDataHasProps({ pageData });
            return mergePageDataWithAppData({ pageData, appInitialProps });
        }
        if (serverPageFile.getStaticProps) {
            const ctx = makeContextObject_1.makeStaticPropsContext({
                pageObject,
            });
            // @TODO introduce `getStaticPaths` logic
            // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
            const pageData = await serverPageFile.getStaticProps(ctx);
            ensurePageDataHasProps({ pageData });
            return mergePageDataWithAppData({ pageData, appInitialProps });
        }
        if (appInitialProps) {
            return { props: appInitialProps.pageProps };
        }
    }
    return {};
}
exports.default = fetchPageData;
