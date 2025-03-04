import express from "express";
import { getGhActivities } from "api-github/service/getGithubActivities.ts";

export const getGithubActivity = async (req: express.Request, res: express.Response) => {
  try {
    const ghLog = await getGhActivities();
    res.status(200).send(ghLog);
  } catch (error) {
    res.status(400).send(`Error, ${error}`);
  }
};
