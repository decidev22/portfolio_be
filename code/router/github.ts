import express from "express";
import { getGithubActivityController } from "api-github/controller/getGithubActivityController.ts";

export default (router: express.Router) => {
  router.get("/github/getActivities", getGithubActivityController);
};
