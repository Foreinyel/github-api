import { Octokit } from "@octokit/rest";
import assert from "assert";
import { BaseOptions } from "./api";
import { checkBranch, getMainBranch } from "./branch";

export type MergeToMainBranchOptions = BaseOptions & {
  branch: string;
};

export const mergeToMainBranch = async (
  github: Octokit,
  options: MergeToMainBranchOptions
) => {
  const mainBranch = await checkBranch({
    owner: options.owner,
    repo: options.repo,
    github,
  });
  assert(!!mainBranch, "Invalid main branch.");
  const res = await github.rest.pulls.create({
    owner: options.owner,
    repo: options.repo,
    head: options.branch,
    base: mainBranch?.name,
    title: `merge ${options.branch} to ${mainBranch?.name}`,
  });
  if (res?.data?.number) {
    const merged = await github.rest.pulls.merge({
      owner: options.owner,
      repo: options.repo,
      pull_number: res.data.number,
    });
    return merged;
  }
  return false;
};
