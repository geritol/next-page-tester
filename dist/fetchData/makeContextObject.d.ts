import type { NextPageContext, GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ExtendedOptions, FoundPageObject, PageObject } from '../commonTypes';
export declare function makeGetInitialPropsContext({ pageObject, options: { req: reqMocker, res: resMocker, previousRoute, env }, }: {
    pageObject: PageObject;
    options: ExtendedOptions;
}): NextPageContext;
export declare function makeGetServerSidePropsContext({ pageObject, options: { req: reqMocker, res: resMocker, previousRoute }, }: {
    pageObject: FoundPageObject;
    options: ExtendedOptions;
}): GetServerSidePropsContext<typeof pageObject.params>;
export declare function makeStaticPropsContext({ pageObject, }: {
    pageObject: FoundPageObject;
}): GetStaticPropsContext<typeof pageObject.params>;
