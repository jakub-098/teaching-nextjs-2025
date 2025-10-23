import { DB } from "@/lib/db-types";
import { Kysely, SqliteDialect } from "kysely";
import Image from "next/image";
import SQLite from "better-sqlite3";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = params.q??"";


  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite"),
  });

  const db = new Kysely<DB>({ dialect });

  const albums = await db
    .selectFrom("albums")
    .where("albums.name", "like", `%${query}%`)
    .select(["albums.id","albums.name","albums.release_date"])
    .execute();

  const authors = await db
    .selectFrom("authors")
    .where("authors.name", "like", `%${query}%`)
    .select(["authors.id","authors.name","authors.bio"])
    .execute();
  
  const songs = await db
    .selectFrom("songs")
    .where("songs.name", "like", `%${query}%`)
    .select(["songs.id","songs.name","songs.duration","songs.album_id"])
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left m-auto">
          results
        </h1>
        <h1 className="text-4xl font-bold text-center sm:text-left m-auto">Albums</h1>
        <div className="grid grid-cols-3 gap-12">
          
          {albums.map((album) => (
            <div key={album.id} className="bg-green-1000 p-8 rounded-md font-semibold font-mono">
              {album.name}: {new Date(album.release_date).toDateString()}

            </div>
            ))}

        </div>
        <h1 className="text-4xl font-bold text-center sm:text-left m-auto">Authors</h1>
        <div className="grid grid-cols-3 gap-12">
          
          {authors.map((author) => (
            <div key={author.id} className="bg-green-1000 p-8 rounded-md font-semibold font-mono">
              {author.name}: {author.bio}

            </div>
            ))}

        </div>

        <h1 className="text-4xl font-bold text-center sm:text-left m-auto">Songs</h1>
        <div className="grid grid-cols-3 gap-12">
          
          {songs.map((song) => (
            <div key={song.id} className="bg-green-1000 p-8 rounded-md font-semibold font-mono">
              {song.name}: Duration: {song.duration} seconds
 
            </div>
            ))}

        </div>
      </main>
    </div>
  );
}