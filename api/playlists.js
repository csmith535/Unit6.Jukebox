import express from "express";
import {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  getTracksByPlaylistId,
} from "../db/queries/playlists.js";

const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.status(200).send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body required.");

    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("Request body requires Name and Description");
    }

    const newPlaylist = await createPlaylist(name, description);
    res.status(201).send(newPlaylist);
  });

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const { id } = req.params;

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).send("Playlist not found");
    }

    const tracks = await getTracksByPlaylistId(id);
    res.status(200).send(tracks);
  })
  .post(async (req, res) => {});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(id);
  res.status(200).send(playlist);
});
