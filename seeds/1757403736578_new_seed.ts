import { DB } from '@/lib/db-types';
import type { Kysely } from 'kysely'

import { faker } from '@faker-js/faker';


// replace `any` with your database interface.
export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom("authors").execute();

	for (let i = 0; i<10; i+=1) {
		await db.insertInto("authors").values({'name': faker.music.artist() , 'bio': faker.lorem.sentence()  }).execute();
	}

	await db.deleteFrom("songs").execute();

	for (let i = 0; i<10; i+=1) {
		await db.insertInto("songs").values({
			'name': faker.music.songName(),
			'duration': Math.floor(Math.random() * 180),
			'album_id': i 
		}).execute();
	}
}
