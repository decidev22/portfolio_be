import express from "express";
import updateGithubRecord from "../service/updateGithubRecord.ts";

export const updateGithubRecordController = async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    console.log("updateGithubRecordController is being called");
    await updateGithubRecord();

    return res.status(200).send("Update successful");
  } catch (error: any) {
    // Return Lambda-compatible error response
    return res.status(400).json({ error: error.message });
  }
};
