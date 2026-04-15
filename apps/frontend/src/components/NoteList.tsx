import type { Note } from "../../../shared/index";
import { NoteItem } from "./NoteItem";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
};

export const NotesList = ({ notes, onDelete, onUpdate }: Props) => {
  return (
    <div>
      <h3>All Notes</h3>

      {notes.length === 0 && <p>No notes yet</p>}

      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};