import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import serverless from "serverless-http";
import router from "../code/router/index.ts";

dotenv.config();

const isLocal = !process.env.AWS_LAMBDA_FUNCTION_NAME;

const app = express();
app.use(compression());
app.use("/", router());

if (isLocal) {
  const port = process.env.PORT || 3001;
  app.listen(port, async () => {
    console.log(`Local server running on http://localhost:${port}`);
    console.log("Andy Baeck portfolio BE running");
  });
}

export const lambdaHandler = serverless(app);
