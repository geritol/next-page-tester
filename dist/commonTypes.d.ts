/// <reference types="node" />
/// <reference types="react" />
import type { GetServerSideProps, GetStaticProps, GetStaticPaths, NextPage, Redirect } from 'next';
import type { NextRouter } from 'next/router';
import type { createResponse, createRequest } from 'node-mocks-http';
import type { ParsedUrlQuery } from 'querystring';
import type { DocumentType, Enhancer } from 'next/dist/next-server/lib/utils';
import { RuntimeEnvironment } from './constants';
import DefaultError from 'next/error';
import DefaultApp from './_app/DefaultApp';
export declare type Req = ReturnType<typeof createRequest>;
export declare type Res = ReturnType<typeof createResponse>;
export declare type ReqEnhancer = (req: Req) => Req;
export declare type ResEnhancer = (res: Res) => Res;
export declare type Options = {
    route: string;
    sharedModules?: string[];
    nextRoot?: string;
    req?: ReqEnhancer;
    res?: ResEnhancer;
    router?: (router: NextRouter) => NextRouter;
    useApp?: boolean;
    useDocument?: boolean;
    dotenvFile?: string;
    wrapper?: {
        Page?: Enhancer<NextPage>;
    };
};
declare type OptionsWithoutDefaultValue = 'dotenvFile' | 'wrapper';
export declare type OptionsWithDefaults = Omit<Required<Options>, OptionsWithoutDefaultValue> & Pick<Options, OptionsWithoutDefaultValue>;
export declare type ExtendedOptions = OptionsWithDefaults & {
    pagesDirectory: string;
    pageExtensions: string[];
    previousRoute?: string;
    env: RuntimeEnvironment;
};
export declare type PageParams = ParsedUrlQuery;
export declare type RouteInfo = {
    params: PageParams;
    query: PageParams;
    route: string;
    pagePath: string;
    resolvedUrl: string;
};
export declare type FoundPageObject = RouteInfo & {
    type: 'found';
    absolutePagePath: string;
    files: MultiEnv<NextExistingPageFiles>;
};
export declare type NotFoundPageObject = RouteInfo & {
    type: 'notFound';
    absolutePagePath: string;
    files: MultiEnv<NextErrorPageFiles>;
};
export declare type PageObject = FoundPageObject | NotFoundPageObject;
export declare type PageProps = {
    [key: string]: unknown;
};
export declare type PageData<P extends PageProps = PageProps> = {
    props?: P;
    redirect?: Redirect;
    notFound?: true;
};
export declare type PageInfo = {
    pageObject: PageObject;
    pageData: PageData;
};
export declare type NextPageFile = {
    [name: string]: unknown;
    default: NextPage;
    getServerSideProps?: GetServerSideProps;
    getStaticProps?: GetStaticProps;
    getStaticPaths?: GetStaticPaths;
};
export declare type NextApp = typeof DefaultApp;
export declare type NextAppFile = {
    [name: string]: unknown;
    default: NextApp;
};
export declare type NextErrorFile = {
    default: typeof DefaultError;
};
export declare type NextDocumentFile = {
    default: DocumentType;
};
export declare class CustomError extends Error {
    payload?: unknown;
}
export declare type NextFile = NextErrorFile | NextPageFile;
export declare type NextPageFiles<PageFile extends NextFile> = {
    documentFile: NextDocumentFile;
    appFile: NextAppFile;
    pageFile: PageFile;
};
export declare type NextExistingPageFiles = NextPageFiles<NextPageFile>;
export declare type NextErrorPageFiles = NextPageFiles<NextErrorFile>;
export declare type MultiEnv<FileType> = {
    client: FileType;
    server: FileType;
};
export declare type MakePageResult = {
    pageElement: JSX.Element;
    pageObject: PageObject;
};
export {};
