import type { Note } from "../../../shared/index";

type Props = {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
};

export const NoteItem = ({ note, onDelete, onUpdate }: Props) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <p><b>Patient:</b> {note.patientId}</p>
      <p><b>Doctor:</b> {note.attendingDocId}</p>
      <p><b>Created:</b> {new Date(note.createdAt).toLocaleString()}</p>

      <textarea
        defaultValue={note.content}
        onBlur={(e) => onUpdate(note.id, e.target.value)}
      />

      <br />

      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};