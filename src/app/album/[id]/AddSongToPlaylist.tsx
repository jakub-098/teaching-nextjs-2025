'use client';

import { addSong } from '@/actions/playlists';

export function AddToPlaylistButton(props: { playlists: object; songId: number }) {
	const playlistArray = Object.values(props.playlists);

	return (
		<details className="dropdown">
			<summary className="btn m-1">Add to playlist</summary>
			<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
				{playlistArray.map((playlist:  {id: number; name: string} ) => (
					<li key={playlist.id} value={playlist.id}>
						<button
							onClick={() => {
								addSong(playlist.id, props.songId);
							}}
						>
							{playlist.name}
						</button>
					</li>
				))}
			</ul>
		</details>
	);
}