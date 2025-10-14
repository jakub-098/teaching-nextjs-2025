import { getDb } from "@/lib/db";
import { DB } from "@/lib/db-types";
import Link from 'next/link'
import { Kysely, SelectAllNode, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
import { tr } from "@faker-js/faker";
import { table } from "console";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const dialect = new SqliteDialect({
      database: new SQLite("db.sqlite"),
    });

  const { id } = await params;
  const db = new Kysely<DB>({ dialect });
  ;

    const result = await db
    .selectFrom('authors')
    .where("id", "=", Number(id))
    .selectAll()
    .execute()

    const author_name = result[0]?.name ?? "Unknown";
    const bio = result[0]?.bio ?? "Unknown";

    const albums = await db
    .selectFrom('albums')
    .where("author_id", "=", Number(id))
    .selectAll()
    .execute()

    console.log(result);
    console.log(albums);




  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-white m-auto">Author page: {author_name}</h1>
        <p>Bio: {bio}</p>

        <div className="grid grid-cols-6 gap-12">
          {albums.map((album) => (
            <div key={album.id} className="bg-green-1000 p-8 rounded-md font-semibold font-mono">
              <p>ID: {album.id}</p>
              <p></p>
              {album.name}: {new Date(album.release_date).toDateString()}
              <Link className="btn btn-primary btn-block" href={`/album/${album.id}`}>details</Link>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}