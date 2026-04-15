import { useEffect, useState } from "react";
import { api } from "./api/axios";
import { NoteForm } from "./components/NoteForm";
import { NotesAPI } from "./api/notes.api";
import type { Note, CreateNoteInput } from "../../shared";

export default function App() {
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    api.get("/health")
      .then((res) => setStatus(res.data.status))
      .catch(console.error);
  }, []);

  useEffect(() => {
    NotesAPI.getAll()
      .then(setNotes)
      .catch(console.error);
  }, []);

  const handleCreate = async (data: CreateNoteInput) => {
    const created = await NotesAPI.create(data);
    setNotes((prev) => [created, ...prev]);
  };

  return (
    <div>
      <h1>Backend status: {status}</h1>

      <NoteForm onCreate={handleCreate} />

      <h3>Notes</h3>
      {notes.map(n => (
        <div key={n.id}>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}