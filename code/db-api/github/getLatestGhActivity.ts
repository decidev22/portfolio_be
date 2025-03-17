import { GhActivityModel } from "../../db/schema/githubSchema.js";

export const getLatestGithubActivity = async () => {
  // Get the latest github activities from db table here.
  try {
    const latestEvent = (await GhActivityModel.find().sort({ date: -1 }))[0];
    return latestEvent;
  } catch (error: any) {
    throw new Error(`Error getting latest github event: ${error}`);
  }
};
