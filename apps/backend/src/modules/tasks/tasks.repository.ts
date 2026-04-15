import { Task } from "@shared/index";

const tasks: Task[] = [];

export class TasksRepository {
  create(task: Task) {
    tasks.push(task);
    return task;
  }

  findByUserId(userId: string) {
    return tasks.filter((t) => t.userId === userId);
  }
}