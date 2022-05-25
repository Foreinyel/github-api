import { CommitPushOptions } from "./commit-push";
import { CreateRepositoryOptions, CreateRepositoryFromTemplateOptions } from "./api";
import { CheckoutOptions, CreateBranchOptions } from "./branch";
import { MergeToMainBranchOptions } from "./pull";
export interface GitHubOptions {
    token: string;
}
export declare class GitHub {
    token: string;
    github: import("@octokit/core").Octokit & {
        paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
    } & import("@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types").RestEndpointMethods & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api;
    constructor(options: GitHubOptions);
    commitPush(options: Omit<CommitPushOptions, "github" | "token">): Promise<void>;
    createRepository(options: CreateRepositoryOptions | CreateRepositoryFromTemplateOptions): Promise<void>;
    createBranch(options: Omit<CreateBranchOptions, "github" | "token">): Promise<void>;
    checkout(options: Omit<CheckoutOptions, "github" | "token">): Promise<{
        folder: string;
    }>;
    mergeToMainBranch(options: MergeToMainBranchOptions): Promise<false | import("@octokit/types").OctokitResponse<{
        sha: string;
        merged: boolean;
        message: string;
    }, 200>>;
}
export default GitHub;
