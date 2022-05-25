import { RestEndpointMethodTypes, Octokit } from "@octokit/rest";

export type FileMode = "100644" | "100755" | "040000" | "160000" | "120000";
export type FileType = "blob" | "tree" | "commit";
export type TreeFile = {
  path: string;
  content: string | Buffer;
};

export interface BaseOptions {
  owner: string;
  repo: string;
}

export type GetReferenceCommitOptions =
  RestEndpointMethodTypes["git"]["getRef"]["parameters"];

export const getReferenceCommit = async (
  github: Octokit,
  options: GetReferenceCommitOptions
) => {
  try {
    const res = await github.git.getRef(options);
    return res.data;
  } catch (err) {}
};

export type CreateTreeOptions = {
  files: TreeFile[];
  referenceCommitSha?: string;
} & BaseOptions;

export const createTree = async (
  github: Octokit,
  options: CreateTreeOptions
) => {
  if (options?.files?.length) {
    const blobs = await Promise.all(
      options.files.map((item) =>
        github.git.createBlob({
          owner: options.owner,
          repo: options.repo,
          encoding: "utf-8",
          content: Buffer.isBuffer(item.content)
            ? item.content.toString("base64")
            : item.content,
        })
      )
    );
    const files = blobs.map((blob, idx) => {
      return {
        sha: blob.data.sha,
        path: options.files[idx].path,
        mode: "100644" as FileMode,
        type: "blob" as FileType,
      };
    });
    const tree = await github.git.createTree({
      owner: options.owner,
      repo: options.repo,
      tree: files,
      base_tree: options.referenceCommitSha,
    });
    return tree.data.sha;
  }
  return;
};

export type CreateCommitOptions = BaseOptions & {
  commitMessage: string;
  tree: string;
  referenceCommitSha?: string;
};

export const createCommit = async (
  github: Octokit,
  options: CreateCommitOptions
) => {
  const res = await github.git.createCommit({
    owner: options.owner,
    repo: options.repo,
    message: options.commitMessage,
    tree: options.tree,
    parents: options.referenceCommitSha
      ? [options.referenceCommitSha]
      : undefined,
  });
  return {
    newCommitSha: res.data.sha,
  };
};

export type UpdateReferenceOptions = BaseOptions & {
  ref: string;
  sha: string;
  force?: boolean;
};

export const updateReference = async (
  github: Octokit,
  options: UpdateReferenceOptions
) => {
  const res = await github.git.updateRef({
    owner: options.owner,
    repo: options.repo,
    ref: options.ref,
    sha: options.sha,
    force: !!options.force,
  });
  return res.data;
};

export type CreateRepositoryOptions = {
  name: string;
};

export const createRepository = async (
  github: Octokit,
  options: CreateRepositoryOptions
) => {
  return await github.rest.repos.createForAuthenticatedUser({
    name: options.name,
    auto_init: true,
  });
};

export type CreateRepositoryFromTemplateOptions = {
  templateOwner: string;
  templateRepo: string;
} & CreateRepositoryOptions;

export const createRepositoryFromTemplate = async (
  github: Octokit,
  options: CreateRepositoryFromTemplateOptions
) => {
  return await github.rest.repos.createUsingTemplate({
    name: options.name,
    template_owner: options.templateOwner,
    template_repo: options.templateRepo,
  });
};

export type GetBranchesOptions = BaseOptions & {};

export const getBranches = async (
  github: Octokit,
  options: GetBranchesOptions
) => {
  const res = await github.rest.repos.listBranches({
    owner: options.owner,
    repo: options.repo,
    per_page: 100,
  });
  return res.data;
};
