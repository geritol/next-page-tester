import React from 'react';
import { makeRenderMethods } from './makeRenderMethods';
import { Options } from './commonTypes';
export default function getPage({ route, nextRoot, req, res, router, useApp, useDocument, dotenvFile, wrapper, sharedModules, }: Options): Promise<{
    page: React.ReactElement;
} & ReturnType<typeof makeRenderMethods>>;
