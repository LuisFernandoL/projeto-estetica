import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("Deve ser um e-mail válido"),
  admin: z.boolean().default(false),
  password: z.string().min(8, "A senha deve conter mais de 8 caracteres"),
});

export const loginSchema = UserSchema.omit({ name: true });

export type UserData = z.infer<typeof UserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
