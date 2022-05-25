/// <reference types="node" />
import { RestEndpointMethodTypes, Octokit } from "@octokit/rest";
export declare type FileMode = "100644" | "100755" | "040000" | "160000" | "120000";
export declare type FileType = "blob" | "tree" | "commit";
export declare type TreeFile = {
    path: string;
    content: string | Buffer;
};
export interface BaseOptions {
    owner: string;
    repo: string;
}
export declare type GetReferenceCommitOptions = RestEndpointMethodTypes["git"]["getRef"]["parameters"];
export declare const getReferenceCommit: (github: Octokit, options: GetReferenceCommitOptions) => Promise<{
    ref: string;
    node_id: string;
    url: string;
    object: {
        type: string;
        sha: string;
        url: string;
    };
} | undefined>;
export declare type CreateTreeOptions = {
    files: TreeFile[];
    referenceCommitSha?: string;
} & BaseOptions;
export declare const createTree: (github: Octokit, options: CreateTreeOptions) => Promise<string | undefined>;
export declare type CreateCommitOptions = BaseOptions & {
    commitMessage: string;
    tree: string;
    referenceCommitSha?: string;
};
export declare const createCommit: (github: Octokit, options: CreateCommitOptions) => Promise<{
    newCommitSha: string;
}>;
export declare type UpdateReferenceOptions = BaseOptions & {
    ref: string;
    sha: string;
    force?: boolean;
};
export declare const updateReference: (github: Octokit, options: UpdateReferenceOptions) => Promise<{
    ref: string;
    node_id: string;
    url: string;
    object: {
        type: string;
        sha: string;
        url: string;
    };
}>;
export declare type CreateRepositoryOptions = {
    name: string;
};
export declare const createRepository: (github: Octokit, options: CreateRepositoryOptions) => Promise<void>;
export declare type CreateRepositoryFromTemplateOptions = {
    templateOwner: string;
    templateRepo: string;
} & CreateRepositoryOptions;
export declare const createRepositoryFromTemplate: (github: Octokit, options: CreateRepositoryFromTemplateOptions) => Promise<void>;
export declare type GetBranchesOptions = BaseOptions & {};
export declare const getBranches: (github: Octokit, options: GetBranchesOptions) => Promise<{
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
    protection?: {
        url?: string | undefined;
        enabled?: boolean | undefined;
        required_status_checks?: {
            url?: string | undefined;
            enforcement_level?: string | undefined;
            contexts: string[];
            contexts_url?: string | undefined;
            strict?: boolean | undefined;
        } | undefined;
        enforce_admins?: {
            url: string;
            enabled: boolean;
        } | undefined;
        required_pull_request_reviews?: {
            url?: string | undefined;
            dismissal_restrictions?: {
                users?: {
                    name?: string | null | undefined;
                    email?: string | null | undefined;
                    login: string;
                    id: number;
                    node_id: string;
                    avatar_url: string;
                    gravatar_id: string | null;
                    url: string;
                    html_url: string;
                    followers_url: string;
                    following_url: string;
                    gists_url: string;
                    starred_url: string;
                    subscriptions_url: string;
                    organizations_url: string;
                    repos_url: string;
                    events_url: string;
                    received_events_url: string;
                    type: string;
                    site_admin: boolean;
                    starred_at?: string | undefined;
                }[] | undefined;
                teams?: {
                    id: number;
                    node_id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    privacy?: string | undefined;
                    permission: string;
                    permissions?: {
                        pull: boolean;
                        triage: boolean;
                        push: boolean;
                        maintain: boolean;
                        admin: boolean;
                    } | undefined;
                    url: string;
                    html_url: string;
                    members_url: string;
                    repositories_url: string;
                    parent: {
                        id: number;
                        node_id: string;
                        url: string;
                        members_url: string;
                        name: string;
                        description: string | null;
                        permission: string;
                        privacy?: string | undefined;
                        html_url: string;
                        repositories_url: string;
                        slug: string;
                        ldap_dn?: string | undefined;
                    } | null;
                }[] | undefined;
                url?: string | undefined;
                users_url?: string | undefined;
                teams_url?: string | undefined;
            } | undefined;
            dismiss_stale_reviews: boolean;
            require_code_owner_reviews: boolean;
            required_approving_review_count?: number | undefined;
        } | undefined;
        restrictions?: {
            url: string;
            users_url: string;
            teams_url: string;
            apps_url: string;
            users: {
                login?: string | undefined;
                id?: number | undefined;
                node_id?: string | undefined;
                avatar_url?: string | undefined;
                gravatar_id?: string | undefined;
                url?: string | undefined;
                html_url?: string | undefined;
                followers_url?: string | undefined;
                following_url?: string | undefined;
                gists_url?: string | undefined;
                starred_url?: string | undefined;
                subscriptions_url?: string | undefined;
                organizations_url?: string | undefined;
                repos_url?: string | undefined;
                events_url?: string | undefined;
                received_events_url?: string | undefined;
                type?: string | undefined;
                site_admin?: boolean | undefined;
            }[];
            teams: {
                id?: number | undefined;
                node_id?: string | undefined;
                url?: string | undefined;
                html_url?: string | undefined;
                name?: string | undefined;
                slug?: string | undefined;
                description?: string | null | undefined;
                privacy?: string | undefined;
                permission?: string | undefined;
                members_url?: string | undefined;
                repositories_url?: string | undefined;
                parent?: string | null | undefined;
            }[];
            apps: {
                id?: number | undefined;
                slug?: string | undefined;
                node_id?: string | undefined;
                owner?: {
                    login?: string | undefined;
                    id?: number | undefined;
                    node_id?: string | undefined;
                    url?: string | undefined;
                    repos_url?: string | undefined;
                    events_url?: string | undefined;
                    hooks_url?: string | undefined;
                    issues_url?: string | undefined;
                    members_url?: string | undefined;
                    public_members_url?: string | undefined;
                    avatar_url?: string | undefined;
                    description?: string | undefined;
                    gravatar_id?: string | undefined;
                    html_url?: string | undefined;
                    followers_url?: string | undefined;
                    following_url?: string | undefined;
                    gists_url?: string | undefined;
                    starred_url?: string | undefined;
                    subscriptions_url?: string | undefined;
                    organizations_url?: string | undefined;
                    received_events_url?: string | undefined;
                    type?: string | undefined;
                    site_admin?: boolean | undefined;
                } | undefined;
                name?: string | undefined;
                description?: string | undefined;
                external_url?: string | undefined;
                html_url?: string | undefined;
                created_at?: string | undefined;
                updated_at?: string | undefined;
                permissions?: {
                    metadata?: string | undefined;
                    contents?: string | undefined;
                    issues?: string | undefined;
                    single_file?: string | undefined;
                } | undefined;
                events?: string[] | undefined;
            }[];
        } | undefined;
        required_linear_history?: {
            enabled?: boolean | undefined;
        } | undefined;
        allow_force_pushes?: {
            enabled?: boolean | undefined;
        } | undefined;
        allow_deletions?: {
            enabled?: boolean | undefined;
        } | undefined;
        required_conversation_resolution?: {
            enabled?: boolean | undefined;
        } | undefined;
        name?: string | undefined;
        protection_url?: string | undefined;
        required_signatures?: {
            url: string;
            enabled: boolean;
        } | undefined;
    } | undefined;
    protection_url?: string | undefined;
}[]>;
