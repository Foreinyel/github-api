import { Octokit } from "@octokit/rest";
import { BaseOptions } from "./api";
export declare type MergeToMainBranchOptions = BaseOptions & {
    branch: string;
};
export declare const mergeToMainBranch: (github: Octokit, options: MergeToMainBranchOptions) => Promise<false | import("@octokit/types").OctokitResponse<{
    sha: string;
    merged: boolean;
    message: string;
}, 200>>;
