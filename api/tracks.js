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

  const numId = Number(id);

  // Could also use regex here to check for number only validation
  if (isNaN(numId)) {
    return res.status(400).send("ID must be a number");
  }

  const track = await getTrackById(id);

  if (!track) {
    return res.status(404).send("Track does not exist");
  }

  res.status(200).send(track);
});
