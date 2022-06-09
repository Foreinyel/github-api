import getInstance from "./getInstance";
import commitPush, { CommitPushOptions } from "./commit-push";
import {
  CreateRepositoryOptions,
  createRepository,
  CreateRepositoryFromTemplateOptions,
  createRepositoryFromTemplate,
} from "./api";
import {
  checkout,
  CheckoutOptions,
  compareBranches,
  CompareBranchesOptions,
  createBranch,
  CreateBranchOptions,
} from "./branch";
import {
  mergeBranches,
  MergeBranchesOptions,
  mergeToMainBranch,
  MergeToMainBranchOptions,
} from "./pull";

export interface GitHubOptions {
  token: string;
}

export class GitHub {
  token;
  github;
  constructor(options: GitHubOptions) {
    this.token = options.token;
    this.github = getInstance(this.token);
  }

  commitPush(options: Omit<CommitPushOptions, "github" | "token">) {
    return commitPush.call(this, { ...options, github: this.github });
  }

  createRepository(
    options: CreateRepositoryOptions | CreateRepositoryFromTemplateOptions
  ) {
    if ("templateOwner" in options) {
      return createRepositoryFromTemplate.call(this, this.github, options);
    } else {
      return createRepository.call(this, this.github, options);
    }
  }

  createBranch(options: Omit<CreateBranchOptions, "github" | "token">) {
    return createBranch.call(this, { ...options, github: this.github });
  }

  checkout(options: Omit<CheckoutOptions, "github" | "token">) {
    return checkout.call(this, { ...options, github: this.github });
  }

  mergeToMainBranch(
    options: Omit<MergeToMainBranchOptions, "github" | "token">
  ) {
    return mergeToMainBranch.call(this, { ...options, github: this.github });
  }
  mergeBranches(options: Omit<MergeBranchesOptions, "github" | "token">) {
    return mergeBranches.call(this, { ...options, github: this.github });
  }

  compareBranches(options: Omit<CompareBranchesOptions, "github" | "token">) {
    return compareBranches.call(this, { ...options, github: this.github });
  }
}

export default GitHub;
