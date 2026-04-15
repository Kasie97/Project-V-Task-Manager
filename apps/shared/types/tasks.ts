export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  userId: string;
};