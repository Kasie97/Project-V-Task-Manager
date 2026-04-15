import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateNoteInput } from "../../../shared/index";

type Props = {
  onCreate: (data: CreateNoteInput) => void | Promise<void>;
};

export const NoteForm = ({ onCreate }: Props) => {
  const [patientId, setPatientId] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patientId || !content) return;

    await onCreate({
      patientId,
      content,
    });

    setPatientId("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Create Note</h3>

      <input
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Write note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button type="submit">Add Note</button>
    </form>
  );
};