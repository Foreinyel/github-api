import { Octokit } from "@octokit/rest";
import assert from "assert";
import { download } from "@hemyn/utils-node";
import { rm } from "./utils";

import { BaseOptions, getBranches, GetBranchesOptions } from "./api";
import path from "path";

export type GetMainBranchOptions = GetBranchesOptions & {
  github: Octokit;
};

export const getMainBranch = async (options: GetMainBranchOptions) => {
  const branches = await getBranches(options.github, options);
  return branches.find((branch) => ["main", "master"].includes(branch.name));
};

export type CreateBranchOptions = BaseOptions & {
  sourceBranchName?: string;
  targetBranchName: string;
  github: Octokit;
};

/**
 * create a new branch from source branch
 * @param options.owner
 * @param options.repo
 * @param options.sourceBranchName default main branch
 * @param options.targetBranchName
 */
export const createBranch = async (options: CreateBranchOptions) => {
  const sourceBranch = await checkBranch({
    ...options,
    branch: options.sourceBranchName,
  });
  assert(
    !!sourceBranch,
    `Invalid sourceBranchName: ${options.sourceBranchName}`
  );

  await options.github.git.createRef({
    owner: options.owner,
    repo: options.repo,
    ref: `refs/heads/${options.targetBranchName}`,
    sha: sourceBranch.commit.sha,
  });
};

export type CheckBranch = BaseOptions & {
  branch?: string;
  github: Octokit;
};

export const checkBranch = async (options: CheckBranch) => {
  const branches = await getBranches(options.github, options);

  const branch = branches.find((item) =>
    options.branch
      ? item.name === options.branch
      : ["main", "master"].includes(item.name)
  );
  return branch;
};

export type CheckoutOptions = BaseOptions & {
  branch?: string;
  github: Octokit;
  cwd: string;
};

export const checkout = async (options: CheckoutOptions) => {
  const branch = await checkBranch({ ...options });
  assert(!!branch, `Invalid branch: ${options.branch}`);
  const res = await options.github.rest.repos.downloadZipballArchive({
    owner: options.owner,
    repo: options.repo,
    ref: branch.name,
  });
  const filename = (res.headers["content-disposition"] as string)
    ?.split("filename=")[1]
    .split(";")[0];
  assert(!!filename, "Failed to get filename.");
  await rm(path.resolve(options.cwd, filename.split(".")[0]));
  await rm(path.resolve(options.cwd, filename));
  await download({
    dest: options.cwd,
    filename,
    url: res.url,
    extract: "zip",
  });
  await rm(path.resolve(options.cwd, filename));
  return {
    folder: filename.split(".")[0],
  };
};
