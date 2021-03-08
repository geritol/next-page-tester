import type { ExtendedOptions } from '../commonTypes';
declare function getPagePaths({ options: { pagesDirectory, pageExtensions }, }: {
    options: ExtendedOptions;
}): Promise<string[]>;
export default getPagePaths;
