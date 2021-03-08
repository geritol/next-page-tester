import { NextRouter } from 'next/router';
import type { ExtendedOptions, PageObject } from '../commonTypes';
declare type NextPushArgs = Parameters<NextRouter['push']>;
export declare type PushHandler = (url: NextPushArgs[0], as: NextPushArgs[1], options: NextPushArgs[2]) => void;
export default function makeRouterMock({ options: { router: routerEnhancer }, pageObject: { pagePath, params, route, query }, pushHandler, }: {
    options: ExtendedOptions;
    pageObject: PageObject;
    pushHandler?: PushHandler;
}): NextRouter;
export {};
