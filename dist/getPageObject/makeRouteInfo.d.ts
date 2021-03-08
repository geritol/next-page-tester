import type { RouteInfo } from '../commonTypes';
export declare function makeRouteInfo({ route, pagePath, routeRegexCaptureGroups, }: {
    route: string;
    pagePath: string;
    routeRegexCaptureGroups?: Record<string, string>;
}): RouteInfo;
