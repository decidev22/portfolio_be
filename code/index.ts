import express from "express";

import { getActivityList } from "api-github/service/getActivityList.js";

const app = express();
const port = 3005;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/getAllData", (req, res) => {});

app.get("/github-activities", async (req, res) => {
  try {
    const result = await getActivityList();
    if (result) {
      res.status(200).json(result);
    }
    if (!result) {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
