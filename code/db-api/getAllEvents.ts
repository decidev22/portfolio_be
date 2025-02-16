import { CommentModel } from "../db/schema/defaultSchema.ts";

type SortType = "ASC" | "DESC";

export const getAllEvents = async (sortType?: SortType) => {
  try {
    const comments = await CommentModel.find();
    console.log(comments);
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments: " + error);
  }
};
