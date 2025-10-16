import express from "express";
import {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  getTracksByPlaylistId,
} from "../db/queries/playlists.js";
import { getTrackById } from "../db/queries/tracks.js";
import { createPlaylistTrack } from "../db/queries/playliststracks.js";

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

    const newPlaylist = await createPlaylist({ name, description });
    res.status(201).send(newPlaylist);
  });

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const { id } = req.params;

    const numId = Number(id);
    if (isNaN(numId)) {
      return res.status(400).send("ID must be a number");
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).send("Playlist not found");
    }

    const tracks = await getTracksByPlaylistId(id);
    res.status(200).send(tracks);
  })
  .post(async (req, res) => {
    const { id } = req.params;

    const numId = Number(id);
    if (isNaN(numId)) {
      return res.status(400).send("ID must be a number");
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).send("Playlist not found");
    }

    if (!req.body) return res.status(400).send("Request body required.");

    const { trackId } = req.body;
    if (!trackId) {
      return res.status(400).send("Request body requires Track ID");
    }

    const numTrackId = Number(trackId);
    if (isNaN(numTrackId)) {
      return res.status(400).send("Track ID must be a number");
    }

    const track = await getTrackById(trackId);
    if (!track) {
      return res.status(400).send("Track does not exist");
    }

    const playlistTrack = await createPlaylistTrack(id, trackId);
    res.status(201).send(playlistTrack);
  });

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;

  const numId = Number(id);
  if (isNaN(numId)) {
    return res.status(400).send("ID must be a number");
  }

  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }
  res.status(200).send(playlist);
});
