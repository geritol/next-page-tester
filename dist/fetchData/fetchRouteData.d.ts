import type { ExtendedOptions, PageObject } from '../commonTypes';
export default function fetchRouteData({ pageObject, options, }: {
    pageObject: PageObject;
    options: ExtendedOptions;
}): Promise<import("../commonTypes").PageData<import("../commonTypes").PageProps>>;
