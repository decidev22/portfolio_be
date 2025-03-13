import express from "express";
import github from "./github.ts";

const router = express.Router();

// Register all routes :)
export default (): express.Router => {
  github(router);
  return router;
};
