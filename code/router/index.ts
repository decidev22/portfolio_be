import express from "express";
import github from "./github.ts";

const router = express.Router();

export default (): express.Router => {
  github(router);
  return router;
};
