/// <reference types="react" />
import { NextPage } from 'next';
import type { ExtendedOptions, NextApp, PageObject, PageProps } from '../commonTypes';
export default function renderApp({ options, pageObject, pageProps, }: {
    options: ExtendedOptions;
    pageObject: PageObject;
    pageProps: PageProps | undefined;
}): JSX.Element;
export declare function renderEnhancedApp({ App, Page, pageProps, options: { wrapper }, }: {
    App: NextApp;
    Page: NextPage;
    pageProps: PageProps | undefined;
    options: ExtendedOptions;
}): JSX.Element;
