export type Note = {
  id: string;
  patientId: string;
  content: string;
  createdAt: string;
  attendingDocId: string;
};

export type CreateNoteInput = {
  patientId: string;
  content: string;
};

export type UpdateNoteInput = {
  id: string;
  content: string;
};