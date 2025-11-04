import { DB } from "@/lib/db-types";
import { Kysely, SelectAllNode, SqliteDialect } from "kysely";
import Image from "next/image";
import SQLite from "better-sqlite3";
import Link from "next/link";
import { tr } from "@faker-js/faker";
import { table } from "console";



export default async function Home() {
  const dialect = new SqliteDialect({
      database: new SQLite("db.sqlite"),
    });
  
  
    const db = new Kysely<DB>({ dialect });

  const playlists = await db.selectFrom("playlists").selectAll().execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="grid grid-cols-4 gap-12">

          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-900 p-4 rounded font-mono text-white">
              <Link className="font-semibold text-xl hover:text-green-500" href={`/playlists/${playlist.id}`}>{playlist.name}</Link>
              <p className="text-xs text-gray-500">ID: {playlist.id}</p>
            </div>
          ))} 

        </div>

      </main>
    </div>
  );
}