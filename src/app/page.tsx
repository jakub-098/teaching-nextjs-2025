import { DB } from "@/lib/db-types";
import { Kysely, SqliteDialect } from "kysely";
import Image from "next/image";
import SQLite from "better-sqlite3";


export default async function Home() {

  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite"),
  });

  const db = new Kysely<DB>({ dialect });

  const albums = await db.selectFrom("albums").select(["albums.id","albums.name","albums.release_date"]).execute();

  const resoults = await db
    .selectFrom("albums")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select(["albums.id", "albums.name", "authors.name as author_name"])
    .execute();
    //kajove
  // const albums = await db
  //       .selectFrom("albums")
  //       .innerJoin("authors", "authors.id", "author_id")
  //       .select([
  //           "albums.id",
  //           "albums.name",
  //           "albums.release_date",
  //           "authors.name as author_id",
  //       ])
  //       .execute();  
  console.log(resoults);
  console.log(albums[0]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
            aria-hidden
            src="/spotify.png"
            alt="Spotify icon"
            width={100}
            height={100}
          />
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to Spotify!
        </h1>
        <p className="max-w-[480px] text-center text-lg text-zinc-700 sm:text-left">
          This is a simple Spotify clone built with Next.js and Tailwind CSS.
          Explore the features and enjoy the music experience!
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>

        <div className="block gap-4 flex-wrap">
          {resoults.map((resoult) => (
            <div key={resoults.id}>
              {resoult.name} {resoult.author_name}
            </div>
          ))}
        </div>
        <div>
                    {albums.map((album) => (
                        <div
                            key={album.id}
                        >
                            <h2>
                                {album.author_id}
                            </h2>
                            <h3>
                                {album.name}
                            </h3>
                            <span>
                                {new Date(album.release_date).toDateString()}
                            </span>
                        </div>
                    ))}
                </div>
 
        
      </footer>
    </div>
  );
}
