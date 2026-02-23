"use client";

import { createPlaylist } from "@/actions/playlists";
import { useRef } from "react";

export function CreatePlaylistButton() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        className="btn btn-xs m-1"
        onClick={() => modalRef.current?.showModal()}
      >
        Create
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create a new playlist</h3>
          <form
            action={createPlaylist}
            onSubmit={() => modalRef.current?.close()}
          >
            <input
              className="input input-bordered w-full mb-4"
              type="text"
              name="playlistName"
              placeholder="Playlist name"
            />
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </button>
              <button className="btn btn-blue" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
