"use client";

import { updatePlaylist } from "@/actions/playlists";
import { useRef } from "react";

export function EditPlaylistButton(props: {
  playlistId: number;
  playlistName: string;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        className="btn btn-xs m-1"
        onClick={() => modalRef.current?.showModal()}
      >
        Edit
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit playlist</h3>
          <form
            action={updatePlaylist}
            onSubmit={() => modalRef.current?.close()}
          >
            <input
              type="text"
              name="playlistId"
              value={props.playlistId}
              hidden
              readOnly
            />
            <input
              className="input input-bordered w-full mb-4"
              type="text"
              name="playlistName"
              defaultValue={props.playlistName}
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
                Update
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
