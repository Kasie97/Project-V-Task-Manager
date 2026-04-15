import { api } from "./axios";
import type { Task, CreateTaskInput } from "../../../shared/index";

export const TasksAPI = {
  async create(input: CreateTaskInput): Promise<Task> {
    const { data } = await api.post("/tasks", input);
    return data;
  },

  async getByUserId(userId: string): Promise<Task[]> {
    const { data } = await api.get("/tasks", { params: { userId } });
    return data;
  },
};