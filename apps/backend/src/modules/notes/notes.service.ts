import { CreateNoteInput, Note, UpdateNoteInput } from "@shared/index";
import { NotesRepository } from "./notes.repository";
import { DoctorRepository } from "../doctors/doctors.repository";
import crypto from "node:crypto";

export class NotesService {
  constructor(
    private readonly notesRepo: NotesRepository,
    private readonly doctorRepo: DoctorRepository
  ) {}

  createNote(input: CreateNoteInput, doctorId: string): Note {
const doctor = this.doctorRepo.findById(doctorId) ?? { id: "doc-1" };

    if (!doctor) {
      throw new Error("Authenticated doctor not found");
    }

    const note: Note = {
      id: crypto.randomUUID(),
      patientId: input.patientId,
      content: input.content,
      attendingDocId: doctor.id,
      createdAt: new Date().toISOString(),
    };

    return this.notesRepo.create(note);
  }

  getNoteById(id: string) {
    const note = this.notesRepo.findById(id);
    if (!note) throw new Error("Note not found");
    return note;
  }

  getNotesByPatient(patientId: string) {
    return this.notesRepo.findByPatientId(patientId);
  }

  getAllNotes() {
    return this.notesRepo.findAll();
  }

  updateNote(input: UpdateNoteInput) {
    const updated = this.notesRepo.update(input.id, input.content);
    if (!updated) throw new Error("Note not found");
    return updated;
  }

  deleteNote(id: string) {
    const deleted = this.notesRepo.delete(id);
    if (!deleted) throw new Error("Note not found");
    return { success: true };
  }
}