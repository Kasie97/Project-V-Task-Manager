import { Task, CreateTaskInput } from "@shared/index";
import { TasksRepository } from "./tasks.repository";

export class TasksService {
  constructor(private tasksRepo: TasksRepository) {}

  create(input: CreateTaskInput): Task {
    if (!input.title || !input.userId) {
      throw new Error("Title and userId are required");
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      status: "todo",
      userId: input.userId,
      createdAt: new Date(),
    };

    return this.tasksRepo.create(newTask);
  }

  getByUser(userId: string): Task[] {
    if (!userId) {
      throw new Error("userId is required");
    }

    return this.tasksRepo.findByUserId(userId);
  }
}