import express from "express";
import { updateGithubActivities } from "../../db-api/github/updateGithubActivities";
import { getGhActivities } from "./getGithubActivities";
import { GhActivityModel } from "../../db/schema/githubSchema";
import { connectToDatabase } from "../../db";
import { getLatestGithubActivity } from "../../db-api/github/getLatestGhActivity";

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
    // get the latest item from db
    const latestDBActivity = await getLatestGithubActivity();

    // currently fetches top 50 records
    const recentActivities = await getGhActivities();

    if (!recentActivities || recentActivities.length === 0) {
      console.log("There are no events from getGhActivities");
      throw new Error(`There are no events from getGhActivities`);
    }

    const sortedActivities = recentActivities.sort((a: any, b: any) => a.date - b.date);
    for (const event of sortedActivities) {
      // only update when it's more recent than latest item in db.
      if (event.date > latestDBActivity.date) {
        await new GhActivityModel(event).save();
      }
    }
  } catch (error) {
    throw new Error(`Some error: ${error}`);
  }
};

export default updateGithubRecord;
