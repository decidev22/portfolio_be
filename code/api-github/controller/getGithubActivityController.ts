import { getGhActivities } from "../service/getGithubActivities.ts";
import express from "express";

export const getGithubActivityController = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    console.log("getGithubActivityController is being called");
    const ghLog = await getGhActivities();

    // Return Lambda-compatible response
    return res.status(200).json(ghLog);
  } catch (error: any) {
    // Return Lambda-compatible error response
    return res.status(400).json(error);
  }
};
