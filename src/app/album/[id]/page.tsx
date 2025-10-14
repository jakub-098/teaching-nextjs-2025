import { DB } from "@/lib/db-types";
import { Kysely, SelectAllNode, SqliteDialect } from "kysely";
import Image from "next/image";
import SQLite from "better-sqlite3";
import Link from "next/link";
import { tr } from "@faker-js/faker";
import { table } from "console";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

const { id } = await params;

  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite"),
  });


  const db = new Kysely<DB>({ dialect });

  
  const songs = await db.selectFrom("songs").where("album_id", "=", Number(id)).selectAll().execute();
  console.log(songs);
  
  const album_name_result = await db.selectFrom("albums").where("id", "=", Number(id)).select(["name","author_id"]).execute();
  const album_name = album_name_result[0]?.name ?? "Unknown";
  const author_id = album_name_result[0]?.author_id ?? "Unknown";

  const author_name_result = await db.selectFrom("authors").where("id", "=", Number(author_id)).select(["name",]).execute();
  const author_name = author_name_result[0]?.name ?? "Unknown";

  console.log(album_name_result)
  console.log(author_name)


  function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>ALBUM DETAIL: ID: {id}, Album Name: {album_name} Author Name: <Link className="btn btn-primary" href={`/author/${author_id}`}> {author_name}</Link> </div>


        <table className="table">
            {songs.map((song) => (
          
            <tr key={song.id} className="bg-green-1000 p-8 rounded-md font-semibold font-mono">
              <th>ID: {song.id}</th>
              <th>Name: {song.name}</th>
              <th>Duration: {formatDuration(song.duration)}</th>
              

              
            </tr>
            ))}
          </table>
        
      </main>
    </div>
  );
}
