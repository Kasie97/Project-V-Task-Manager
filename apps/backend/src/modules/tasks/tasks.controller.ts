import { Request, Response } from "express";
import { TasksService } from "./tasks.service";

export class TasksController {
  constructor(private tasksService: TasksService) {}

  create(req: Request, res: Response) {
    try {
      const task = this.tasksService.create(req.body);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  getByUser(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const tasks = this.tasksService.getByUser(userId as string);
      res.json(tasks);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}