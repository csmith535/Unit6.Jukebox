import express from "express";
import { getTracks, getTrackById } from "../db/queries/tracks.js";

const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.status(200).send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const track = await getTrackById(id);
  res.status(200).send(track);
});
