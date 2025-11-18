"use client";

import { removePlaylist } from "@/actions/playlists";
import { redirect } from "next/navigation";

export function RemovePlaylist(props: {
  playlistId: number;
  songId: number

}) {
  return (
    <button className="btn btn-primary btn-block" 
      onClick={() => {
        console.log("Remove playlist");
        removePlaylist(props.playlistId, 0);
        redirect("/playlists");
      }}
    >
      Remove Playlist
    </button>
  );
}