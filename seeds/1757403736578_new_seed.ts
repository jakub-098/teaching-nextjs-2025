import { DB } from '@/lib/db-types';
import type { Kysely } from 'kysely'

import { faker } from '@faker-js/faker';


// replace `any` with your database interface.
// export async function seed(db: Kysely<DB>): Promise<void> {
// 	await db.deleteFrom("authors").execute();

// 	for (let i = 0; i<10; i+=1) {
// 		await db.insertInto("authors").values({'name': faker.music.artist() , 'bio': faker.lorem.sentence()  }).execute();
// 	}

// 	await db.deleteFrom("songs").execute();

// 	const numBioParagraphs = faker.number.int({ min: 0, max: 5 });
// 	const bio = numBioParagraphs !== 0 ? faker.lorem.paragraphs(numBioParagraphs) : null ;

// 	for (let i = 0; i<10; i+=1) {
// 		await db.insertInto("songs").values({
// 			'name': faker.music.songName(),
// 			'duration': Math.floor(Math.random() * 180),
// 			'album_id': i 
// 		}).execute();
// 	}

// 	const numAlbums = faker.number.int({ min: 0, max: 10 });
	
// 	const authors = await db.selectFrom("authors").selectAll().execute();

//   for (const author of authors) {
//     const numAlbums = faker.number.int({ min: 0, max: 10 });

//     console.log(author.name, numAlbums);

//     for (let i = 0; i < numAlbums; i += 1) {
//       await db
//         .insertInto("albums")
//         .values({
//           author_id: author.id,
//           name: faker.music.album(),
//           release_date: faker.date.past().getTime(),
//         })
//         .execute();
//     }
//   }
// }

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom("songs").execute();
  await db.deleteFrom("albums").execute();
  await db.deleteFrom("authors").execute();

  for (let i = 0; i < 20; i += 1) {
    const numBioParagraphs = faker.number.int({ min: 0, max: 5 });

    const bio =
      numBioParagraphs !== 0 ? faker.lorem.paragraph(numBioParagraphs) : null;

    await db
      .insertInto("authors")
      .values({
        name: faker.music.artist(),
        bio,
      })
      .execute();
  }

  const authors = await db.selectFrom("authors").selectAll().execute();

  for (const author of authors) {
    const numAlbums = faker.number.int({ min: 0, max: 10 });

    console.log(author.name, numAlbums);

    for (let i = 0; i < numAlbums; i += 1) {
      await db
        .insertInto("albums")
        .values({
          author_id: author.id,
          name: faker.music.album(),
          release_date: faker.date.past().getTime(),
        })
        .execute();
    }
  }

	const albums = await db.selectFrom("albums").selectAll().execute();

	for (const album of albums) {

		const typOfAlbum = faker.number.int({ min: 0, max: 9 });
		let numSongs = 1;
		
		if (typOfAlbum < 2) {
			numSongs = 1;
		} else if (typOfAlbum < 5) {
			numSongs = faker.number.int({ min: 4, max: 6 });
		} else {
			numSongs = faker.number.int({ min: 10, max: 20 });
		}

		console.log(album.name, numSongs);
		for (let i = 0; i < numSongs; i += 1) {
			await db
				.insertInto("songs")
				.values({
					album_id: album.id,
					name: faker.music.songName(),
					duration: faker.number.int({min: 90, max: 240}),
				})
				.execute();
		}

	


  
}}
