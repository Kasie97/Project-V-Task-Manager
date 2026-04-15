import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { TasksRepository } from "./modules/tasks/tasks.repository";
import { TasksService } from "./modules/tasks/tasks.service";
import { TasksController } from "./modules/tasks/tasks.controller";
import { UserRepository } from "./modules/users/users.repository";
import { UsersController } from "./modules/users/users.controller";

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

const tasksRepo = new TasksRepository();
const tasksService = new TasksService(tasksRepo);
const tasksController = new TasksController(tasksService);

app.post("/tasks", (req: Request, res: Response) =>
  tasksController.create(req, res)
);

app.get("/tasks", (req: Request, res: Response) =>
  tasksController.getByUser(req, res)
);

const usersRepo = new UserRepository();
const usersController = new UsersController(usersRepo);

app.get("/users", (req, res) => usersController.getAll(req, res));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});



export default app;