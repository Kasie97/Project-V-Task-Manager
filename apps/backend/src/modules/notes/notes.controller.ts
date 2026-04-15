import { CreateNoteInput, UpdateNoteInput } from "@shared";
import { NotesService } from "./notes.service";

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  create(req: any, res: any) {
    try {
      const body: CreateNoteInput = req.body;
    const doctorId = req.user?.id ?? "doc-1";
    
      const note = this.notesService.createNote(body, doctorId);

      res.status(201).json(note);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  getById(req: any, res: any) {
    try {
      const note = this.notesService.getNoteById(req.params.id);
      res.json(note);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  getByPatient(req: any, res: any) {
    try {
      const notes = this.notesService.getNotesByPatient(req.params.patientId);
      res.json(notes);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  getAll(req: any, res: any) {
    try {
      const notes = this.notesService.getAllNotes();
      res.json(notes);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  update(req: any, res: any) {
    try {
      const body: UpdateNoteInput = {
        id: req.params.id,
        content: req.body.content,
      };

      const note = this.notesService.updateNote(body);
      res.json(note);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  delete(req: any, res: any) {
    try {
      const result = this.notesService.deleteNote(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
}