import { api } from "./axios";
import type { User } from "../../../shared/index";

export const UsersAPI = {
  async getAll(): Promise<User[]> {
    const { data } = await api.get("/users");
    return data;
  },
};