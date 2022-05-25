import { Octokit } from "@octokit/rest";
import * as api from "./api";
import getInstance from "./getInstance";
import * as _ from "@hemyn/utils-node";
import fs from "fs";
import path from "path";
import * as GitignoreParser from "gitignore-parser";
import { assert } from "console";
import { checkBranch } from "./branch";

export interface CommitPushOptions {
  github: Octokit;
  cwd: string;
  owner: string;
  repo: string;
  commitMessage: string;
  branch?: string;
}

export const commitAndPushForInitRepo = async (options: CommitPushOptions) => {
  const github = options.github;

  const fileList = await _.listFiles(options.cwd);
  const gitignoreFile = fileList.find((item) => item.endsWith(".gitignore"));
  let validFileList: string[];
  if (gitignoreFile) {
    const gitignore = GitignoreParser.compile(
      fs.readFileSync(gitignoreFile, "utf8")
    );
    validFileList = fileList.filter((file) =>
      gitignore.accepts(path.relative(options.cwd, file))
    );
  } else {
    validFileList = fileList;
  }

  if (validFileList?.length) {
    const branch = await checkBranch({
      owner: options.owner,
      repo: options.repo,
      branch: options.branch,
      github,
    });
    assert(!!branch, "Invalid branch.");
    const ref = `heads/${branch?.name}`;
    const referenceCommit = await api.getReferenceCommit(github, {
      owner: options.owner,
      repo: options.repo,
      ref,
    });
    const tree = await api.createTree(github, {
      owner: options.owner,
      repo: options.repo,
      files: validFileList.map((item) => {
        console.log(path.relative(options.cwd, item));
        return {
          path: path.relative(options.cwd, item),
          content: fs.readFileSync(item, "utf8"),
        };
      }),
      referenceCommitSha: referenceCommit?.object.sha,
    });
    const commit = await api.createCommit(github, {
      owner: options.owner,
      repo: options.repo,
      commitMessage: options.commitMessage,
      tree: tree!,
      referenceCommitSha: referenceCommit?.object.sha,
    });
    await api.updateReference(github, {
      owner: options.owner,
      repo: options.repo,
      ref,
      sha: commit.newCommitSha,
    });
  }
};

export default async (options: CommitPushOptions) => {
  await commitAndPushForInitRepo(options);
};
