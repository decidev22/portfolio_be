import express from "express";

import { getActivityList } from "api-github/getActivityList.js";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/github-activities", async (req, res) => {
  const result = await getActivityList();
  if (result && result.status === "200") {
    res.send(result);
  }
  res.sendStatus(401);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
