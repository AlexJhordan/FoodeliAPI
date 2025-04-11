import { z } from "zod"

// creating schemas
export const registerSchema = z.object({
  username: z.string().trim().min(1, { message: "Campo vazio." }).max(15, { message: "Username muito longo." }),
  email: z.string().trim().email({ message: "Email inválido." }),
  password: z.string().min(6, { message: "Deve ter 6 ou mais caracteres." }),
})

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z
    .string()
    .min(6, { message: "Deve ter 6 ou mais caracteres." })
    .max(20, { message: "Deve ter 20 ou menos caracteres" }),
})
