/// <reference types="react" />
import type { ExtendedOptions, PageObject, PageProps } from '../commonTypes';
export default function serverRenderDocument({ options, pageProps, pageObject, wrapWithRouter, }: {
    options: ExtendedOptions;
    pageProps: PageProps | undefined;
    pageObject: PageObject;
    wrapWithRouter: (children: JSX.Element) => JSX.Element;
}): Promise<JSX.Element>;
