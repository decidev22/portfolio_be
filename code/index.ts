import express from "express";

import { getActivityList } from "api-github/getActivityList.js";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/github-activities", async (req, res) => {
  try {
    const result = await getActivityList();
    if (result && result.status === 200) {
      res.status(200).json(result);
    }
    if (result.status != 200) {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
