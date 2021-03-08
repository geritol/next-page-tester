export declare function pagePathToRouteRegex(pagePath: string): RegExp;
export declare enum ROUTE_PARAMS_TYPES {
    DYNAMIC = "dynamic",
    CATCH_ALL = "catch_all",
    OPTIONAL_CATCH_ALL = "optional_catch_all"
}
export declare function extractPagePathParamsType({ pagePath, }: {
    pagePath: string;
}): Record<string, ROUTE_PARAMS_TYPES>;
