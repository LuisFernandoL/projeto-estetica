import { Exclude } from "class-transformer";
import { randomUUID } from "node:crypto";

export class User {
  readonly id: string;
  name: string;
  email: string;

  admin: boolean;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    if (!this.admin) {
      this.admin = false;
    }
  }
}
