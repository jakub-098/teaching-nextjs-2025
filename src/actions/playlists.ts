"use server";

import { getDb } from "@/lib/db";

export async function removeSongFromPlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDb()
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();

  console.log(`Removing song ${songId} from playlist ${playlistId}`);
}

export async function removePlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDb()

  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .execute();

  await db
    .deleteFrom("playlists")
    .where("id", "=", playlistId)
    .execute();

  console.log(`Removing song ${songId} from playlist ${playlistId}`);
}




export async function addSong(
  playlistId: number,
  songId: number
)  {
  const db = getDb()
    await db
		.insertInto('playlists_songs')
		.values({
			playlist_id: playlistId,
			song_id: songId,
		})
		.execute();

	console.log(`Adding song ${songId} playlist ${playlistId}`);
}

  