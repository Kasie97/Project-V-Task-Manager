import { Note } from "@shared/index";

const notes: Note[] = [];

export class NotesRepository {
  create(note: Note) {
    notes.push(note);
    return note;
  }

  findById(id: string) {
    return notes.find((n) => n.id === id);
  }

  findByPatientId(patientId: string) {
    return notes.filter((n) => n.patientId === patientId);
  }

  findAll() {
    return notes;
  }

  update(id: string, content: string) {
    const note = notes.find((n) => n.id === id);
    if (!note) return null;

    note.content = content;
    return note;
  }

  delete(id: string) {
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) return false;

    notes.splice(index, 1);
    return true;
  }
}