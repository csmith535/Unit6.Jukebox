import db from "../client.js";

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
    SELECT *
    FROM playlists
    `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1
    `;
  const { rows: playlist } = await db.query(sql, [id]);
  return playlist[0];
}

export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
    `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
