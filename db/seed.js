import db from "#db/client";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTrack } from "./queries/playliststracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 100);
  }
  for (let i = 1; i <= 10; i++) {
    await createPlaylist("Playlist " + i, "Mood " + i);
  }
  let successfulInserts = 0;
  let attempts = 0;
  while (successfulInserts < 15 && attempts < 50) {
    const trackId = 1 + Math.floor(Math.random() * 20);
    const playlistId = 1 + Math.floor(Math.random() * 10);
    try {
      await createPlaylistTrack(playlistId, trackId);
      successfulInserts++;
    } catch (error) {
      if (error.code !== "23505") {
        throw error;
      }
    }
    attempts++;
  }
}
