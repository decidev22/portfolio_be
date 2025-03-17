import express from "express";
import { updateGithubActivities } from "../../db-api/github/updateGithubActivities";
import { getGhActivities } from "./getGithubActivities";
import { GhActivityModel } from "../../db/schema/githubSchema";
import { connectToDatabase } from "../../db";

interface IGithubActivity {
  id: string;
  type: string;
  actor: string;
  repo_name: string;
  repo_url: string;
  payload: string;
  date: string;
}

// this function updates the event record on DB
const updateGithubRecord = async (values?: IGithubActivity[]) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error(`Connection to database failed`);
    }
    const initDB = await getGhActivities();
    if (!initDB || initDB.length === 0) {
      console.log("There are no events from getGhActivities");
      throw new Error(`There are no events from getGhActivities`);
    }
    for (const event of initDB) {
      await new GhActivityModel(event).save();
    }
  } catch (error) {
    throw new Error(`Some error: ${error}`);
  }
};

export default updateGithubRecord;
