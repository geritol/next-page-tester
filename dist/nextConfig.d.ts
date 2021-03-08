import { NextConfig } from 'next/dist/next-server/server/config';
export declare function loadNextConfig({ nextRoot }: {
    nextRoot: string;
}): Promise<void>;
export declare function getNextConfig(): NextConfig;
