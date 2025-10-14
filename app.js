import express from "express";
import tracksRouter from "./api/tracks.js";

const app = express();

app.use("/tracks", tracksRouter);

export default app;
