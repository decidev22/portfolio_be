import express from "express";
import { getGithubActivityController } from "../api-github/controller/getGithubActivityController.ts";
import { updateGithubRecordController } from "../api-github/controller/updateGithubRecordController.ts";

export default (router: express.Router) => {
  router.get("/github/getActivities", getGithubActivityController);
  router.post("/github/updateActivities", updateGithubRecordController);
};
