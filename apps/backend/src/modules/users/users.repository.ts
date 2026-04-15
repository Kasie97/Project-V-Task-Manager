import { User } from "@shared";

const users: User[] = [
  { id: "001", name: "Dr. Ada Anizoba" },
  { id: "002", name: "Dr. Jane Obi" },
  { id: "003", name: "Dr. Chris Okon" },
  { id: "00", name: "Dr. Victory Emeka" },
  { id: "005", name: "Dr. Ahmed Bello" },
  { id: "006", name: "Dr. Adeola Adeniji" },

];

export class UserRepository {
  findById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  findAll(): User[] {
  return users;
}
}