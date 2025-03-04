import express from "express";
import { getGithubActivity } from "api-github/controller/getGithubActivityLog.ts";

export default (router: express.Router) => {
  router.get("/github/getActivities", getGithubActivity);
};
