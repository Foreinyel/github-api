import { Octokit } from "@octokit/rest";
import { BaseOptions } from "./api";
export declare type MergeToMainBranchOptions = BaseOptions & {
    branch: string;
    github: Octokit;
};
export declare const mergeToMainBranch: (options: MergeToMainBranchOptions) => Promise<{
    merged: boolean;
    mergeUrl?: string | undefined;
}>;
export declare type MergeBranchesOptions = BaseOptions & {
    base: string;
    branch: string;
    github: Octokit;
};
export declare const mergeBranches: (options: MergeBranchesOptions) => Promise<{
    merged: boolean;
    mergeUrl?: string | undefined;
}>;
