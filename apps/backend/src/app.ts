import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { NotesRepository } from "./modules/notes/notes.repository";
import { DoctorRepository } from "./modules/doctors/doctors.repository";
import { NotesService } from "./modules/notes/notes.service";
import { NotesController } from "./modules/notes/notes.controller";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});


const notesRepo = new NotesRepository();
const doctorRepo = new DoctorRepository();

const notesService = new NotesService(notesRepo, doctorRepo);
const notesController = new NotesController(notesService);

app.get("/notes", (req: Request, res: Response) =>
  notesController.getAll(req, res)
);

app.get("/notes/:id", (req: Request, res: Response) =>
  notesController.getById(req, res)
);

app.post("/notes", (req: Request, res: Response) =>
  notesController.create(req, res)
);

app.patch("/notes/:id", (req: Request, res: Response) =>
  notesController.update(req, res)
);

app.delete("/notes/:id", (req: Request, res: Response) =>
  notesController.delete(req, res)
);

app.get("/patients/:patientId/notes", (req: Request, res: Response) =>
  notesController.getByPatient(req, res)
);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;