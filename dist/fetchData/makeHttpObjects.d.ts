/// <reference types="qs" />
/// <reference types="express" />
import httpMocks from 'node-mocks-http';
import type { OptionsWithDefaults, PageObject } from '../commonTypes';
export default function makeHttpObjects({ pageObject: { params, route }, reqMocker, resMocker, refererRoute, }: {
    pageObject: PageObject;
    reqMocker: OptionsWithDefaults['req'];
    resMocker: OptionsWithDefaults['res'];
    refererRoute?: string;
}): {
    req: httpMocks.MockRequest<import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>>;
    res: httpMocks.MockResponse<import("express").Response<any>>;
};
