import { GhActivityModel } from "../../db/schema/githubSchema.ts";

type SortType = "ASC" | "DESC";

export const getAllEvents = async (sortType?: SortType) => {
  try {
    const ghActivities = await GhActivityModel.find();
    console.log(ghActivities);
    return ghActivities;
  } catch (error) {
    throw new Error("Error fetching comments: " + error);
  }
};
