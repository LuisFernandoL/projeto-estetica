import { randomUUID } from "node:crypto";

export class Product {
  readonly id: string;
  name: string;
  description: string;
  price: string;
  cover_image: string;
  user_id?: string;
  constructor() {
    this.id = randomUUID();
  }
}
