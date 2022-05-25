import { Octokit } from "@octokit/rest";
export interface CommitPushOptions {
    github: Octokit;
    cwd: string;
    owner: string;
    repo: string;
    commitMessage: string;
    branch?: string;
}
export declare const commitAndPushForInitRepo: (options: CommitPushOptions) => Promise<void>;
declare const _default: (options: CommitPushOptions) => Promise<void>;
export default _default;
