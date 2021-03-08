/// <reference types="node" />
import { URL } from 'url';
import querystring from 'querystring';
export declare function parseRoute({ route }: {
    route: string;
}): URL;
export declare function parseQueryString({ queryString, }: {
    queryString: string;
}): querystring.ParsedUrlQuery;
export declare function stringifyQueryString({ object, leadingQuestionMark, }: {
    object: Parameters<typeof querystring['stringify']>[0];
    leadingQuestionMark?: boolean;
}): string;
export declare function removeFileExtension({ path }: {
    path: string;
}): string;
export declare const defaultNextRoot: string;
export declare function findPagesDirectory({ nextRoot }: {
    nextRoot: string;
}): string;
export declare function getPageExtensions(): string[];
export declare function useMountedState(): () => boolean;
export declare function preservePredefinedSharedModulesIdentity(): void;
export declare function executeWithFreshModules<T>(f: () => T, { sharedModules }: {
    sharedModules: string[];
}): T;
export declare const parseHTML: (html: string) => Document;
export declare function isExternalRoute(route: string): boolean;
