import { URL } from 'url';
import { useRef, useEffect, useCallback } from 'react';
import querystring from 'querystring';
import findRoot from 'find-root';
import { existsSync } from 'fs';
import path from 'path';
import stealthyRequire from 'stealthy-require';
import { getNextConfig } from './nextConfig';
import { InternalError } from './_error';

export function parseRoute({ route }: { route: string }) {
  const urlObject = new URL(`http://test.com${route}`);
  const { pathname } = urlObject;

  /*
   * Next.js redirects by default routes with trailing slash to the counterpart without trailing slash
   * @NOTE: Here we might handle Next.js trailingSlash option
   * https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
   */
  if (pathname.endsWith('/') && pathname !== '/') {
    urlObject.pathname = pathname.slice(0, -1);
  }

  return urlObject;
}

export function parseQueryString({
  queryString,
}: {
  queryString: string;
}): querystring.ParsedUrlQuery {
  const qs = queryString.startsWith('?')
    ? queryString.substring(1)
    : queryString;

  return querystring.parse(qs);
}

export function stringifyQueryString({
  object,
  leadingQuestionMark,
}: {
  object: Parameters<typeof querystring['stringify']>[0];
  leadingQuestionMark?: boolean;
}): string {
  const queryString = querystring.stringify(object);
  if (leadingQuestionMark && queryString) {
    return '?' + queryString;
  }
  return queryString;
}

export function removeFileExtension({ path }: { path: string }) {
  return path.replace(/\.[^/.]+$/, '');
}

export const defaultNextRoot = findRoot(process.cwd());

export function findPagesDirectory({ nextRoot }: { nextRoot: string }) {
  const pagesPaths = [
    path.join(nextRoot, 'pages'),
    path.join(nextRoot, 'src', 'pages'),
  ];
  for (const path of pagesPaths) {
    if (existsSync(path)) {
      return path;
    }
  }

  throw new InternalError(`Cannot find "pages" directory under: ${nextRoot}`);
}

export function getPageExtensions(): string[] {
  const config = getNextConfig();
  return config.pageExtensions as string[];
}

export function useMountedState(): () => boolean {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return get;
}

// @NOTE: It is crucial that these modules preserve their identity between client and server
// for document rendering to work correctly. For things to kick in early enough in the process we
// mark them as such in testHelpers.
const predefinedSharedModules = [
  'react',
  'next/dist/next-server/lib/head-manager-context',
  'next/dist/next-server/lib/router-context',
  'next/dist/next-server/lib/runtime-config',
];

function preserveJestSharedModulesIdentity(modules: string[]) {
  for (const moduleName of modules) {
    // @NOTE for some reason Jest needs us to pre-import the modules
    // we want to require with jest.requireActual
    require(moduleName);
    jest.mock(moduleName, () => jest.requireActual(moduleName));
  }
}

export function preservePredefinedSharedModulesIdentity() {
  preserveJestSharedModulesIdentity(predefinedSharedModules);
}

export function executeWithFreshModules<T>(
  f: () => T,
  { sharedModules }: { sharedModules: string[] }
): T {
  /* istanbul ignore else */
  if (typeof jest !== 'undefined') {
    let result: T;

    preserveJestSharedModulesIdentity(sharedModules);

    jest.isolateModules(() => {
      result = f();
    });
    // @ts-expect-error result is surely defined here
    return result;
  }
  // @NOTE this branch will never be execute by Jest
  else {
    return stealthyRequire(
      require.cache,
      f,
      () => {
        for (const moduleName of [
          ...predefinedSharedModules,
          ...sharedModules,
        ]) {
          require(moduleName);
        }
      },
      module
    );
  }
}

export const parseHTML = (html: string) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(html, 'text/html');
};

const ABSOLUTE_URL_REGEXP = new RegExp('^(?:[a-z]+:)?//', 'i');

export function isExternalRoute(route: string) {
  return Boolean(route.match(ABSOLUTE_URL_REGEXP));
}
