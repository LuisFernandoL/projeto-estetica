import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  cover_image: z.string(),
});

export type ProductData = z.infer<typeof ProductSchema>;

export const ProductSchemaRequest = ProductSchema.omit({
  id: true,
  cover_image: true,
});

export type productRequest = z.infer<typeof ProductSchemaRequest>;
