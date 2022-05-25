export interface DownloadOptions {
    dest: string;
    url: string;
    extract?: boolean;
}
export declare const download: (options: DownloadOptions) => Promise<void>;
