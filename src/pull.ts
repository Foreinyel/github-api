import { Octokit } from "@octokit/rest";
import assert from "assert";
import { BaseOptions } from "./api";
import { checkBranch, getMainBranch } from "./branch";

export type MergeToMainBranchOptions = BaseOptions & {
  branch: string;
  github: Octokit;
};

export const mergeToMainBranch = async (options: MergeToMainBranchOptions) => {
  const mainBranch = await checkBranch({
    owner: options.owner,
    repo: options.repo,
    github: options.github,
  });
  assert(!!mainBranch, "Invalid main branch.");
  return await mergeBranches({
    ...options,
    base: mainBranch.name,
  });
};
export type MergeBranchesOptions = BaseOptions & {
  base: string;
  branch: string;
  github: Octokit;
};

export const mergeBranches = async (options: MergeBranchesOptions) => {
  const result = {
    merged: false,
  } as { merged: boolean; mergeUrl?: string };
  try {
    const baseBranch = await checkBranch({
      owner: options.owner,
      repo: options.repo,
      github: options.github,
      branch: options.base,
    });
    assert(!!baseBranch, "Invalid base branch.");
    const branch = await checkBranch({
      owner: options.owner,
      repo: options.repo,
      github: options.github,
      branch: options.branch,
    });
    assert(!!branch, "Invalid branch.");
    const res = await options.github.rest.pulls.create({
      owner: options.owner,
      repo: options.repo,
      head: options.branch,
      base: baseBranch.name,
      title: `merge ${options.branch} to ${baseBranch.name}`,
    });
    result.mergeUrl = res.url;

    if (res?.data?.number) {
      const merged = await options.github.rest.pulls.merge({
        owner: options.owner,
        repo: options.repo,
        pull_number: res.data.number,
      });
      result.merged = merged.data.merged;
    }
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
};
