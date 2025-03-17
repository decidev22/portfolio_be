import express from "express";
import { getGhActivities } from "../service/getGithubActivities.ts";

export const getGithubActivityController = async (req: express.Request, res: express.Response) => {
  try {
    console.log("getGithubActivityController is being called");
    const ghLog = await getGhActivities();
    res.status(200).send(ghLog);
  } catch (error) {
    res.status(400).send(`Error, ${error}`);
  }
};
