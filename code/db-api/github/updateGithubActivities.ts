import { GhActivityModel } from "../../db/schema/githubSchema.js";
import { getLatestGithubActivity } from "./getLatestGhActivity.js";

export const updateGithubActivities = async (values: Record<string, any>) => {
  try {
    const latestEvent = await getLatestGithubActivity();
    const sortedValues = values.slice().sort((a: any, b: any) => a.date - b.date);
    for (const event of sortedValues) {
      if (event.date > latestEvent.date) {
        await new GhActivityModel(event).save();
      }
    }
  } catch (error) {
    throw error;
  }
};
