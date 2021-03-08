/// <reference types="react" />
import type { ExtendedOptions } from '../commonTypes';
export declare function makePageElement({ options, }: {
    options: ExtendedOptions;
}): Promise<{
    pageElement: JSX.Element;
    pageObject: import("../commonTypes").PageObject;
}>;
