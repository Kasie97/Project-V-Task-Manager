import { api } from "./axios";
import type {
  Note,
  CreateNoteInput,
  UpdateNoteInput,
} from "../../../shared/index";

export const NotesAPI = {
  async getAll(): Promise<Note[]> {
    const { data } = await api.get("/notes");
    return data;
  },

  async getByPatient(patientId: string): Promise<Note[]> {
    const { data } = await api.get(`/patients/${patientId}/notes`);
    return data;
  },

  async create(input: CreateNoteInput): Promise<Note> {
    const { data } = await api.post("/notes", input);
    return data;
  },

  async update(id: string, input: UpdateNoteInput): Promise<Note> {
    const { data } = await api.patch(`/notes/${id}`, input);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};