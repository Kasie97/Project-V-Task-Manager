import { useEffect, useState } from "react";
import { NotesAPI } from "../api/notes.api";
import type {
  Note,
  CreateNoteInput,
  UpdateNoteInput,
} from "../../../shared/index";

import { NoteForm } from "../components/NoteForm";
import { NotesList } from "../components/NoteList";

export default function NotesDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await NotesAPI.getAll();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (input: CreateNoteInput) => {
    const newNote = await NotesAPI.create(input);
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleUpdate = async (id: string, content: string) => {
    const updatedInput: UpdateNoteInput = { id, content };
    const updated = await NotesAPI.update(id, updatedInput);

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? updated : n))
    );
  };

  const handleDelete = async (id: string) => {
    await NotesAPI.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes Dashboard</h1>

      <NoteForm onCreate={handleCreate} />

      {loading && <p>Loading notes...</p>}

      <NotesList
        notes={notes}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}