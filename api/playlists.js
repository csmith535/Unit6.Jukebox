import express from "express";
import { getPlaylists, getPlaylistById } from "../db/queries/playlists.js";

const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const playlists = await getPlaylists();
  res.status(200).send(playlists);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(id);
  res.status(200).send(playlist);
});
