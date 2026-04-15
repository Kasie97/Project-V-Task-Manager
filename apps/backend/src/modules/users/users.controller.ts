import { Request, Response } from "express";
import { UserRepository } from "./users.repository";

export class UsersController {
  constructor(private userRepo: UserRepository) {}

  getAll(_req: Request, res: Response) {
    res.json(this.userRepo.findAll());
  }
}