import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import prisma from "@/utils/client.js"
import { type Request, type Response } from "express"
import { registerSchema, loginSchema } from "@/schemas/authSchemas.js"
import { z } from "zod"
import { resJson } from "../utils/responseHelper.js"
import { env } from "@/env.js"

// type RegisterBody = z.infer<typeof registerSchema>
type LoginBody = z.infer<typeof loginSchema>

const { JWT_SECRET_KEY } = env

const registerUser = async (req: Request<{}, {}, z.infer<typeof loginSchema>>, res: Response) => {
  try {
    const result = await registerSchema.safeParseAsync(req.body)

    if (!result.success) {
      resJson(res, 400, "Dados faltando.", result.error.issues)
      return
    }
    const { username, email, password } = result.data
    const { genSalt, hash } = bcrypt

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      resJson(res, 409, "Email já está em uso")
      return
    }

    const hashedPassword = await hash(password, await genSalt(10))

    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      },
    })

    resJson(res, 201, "Usuario criado com sucesso")
  } catch (err) {
    console.error("error in /authService: ", err)
    resJson(res, 500, "Erro no servidor, tente novamente")
  }
}

const loginUser = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const result = await loginSchema.safeParseAsync(req.body)

    if (!result.success) {
      resJson(res, 400, "Dados faltando.", result.error.issues)
      return
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      resJson(res, 400, "Usuário não encontrado.")
      return
    }

    const { id, password: userPassword } = user

    const isMatch = await bcrypt.compare(password, userPassword)

    if (!isMatch) {
      resJson(res, 400, "Senha incorreta.")
      return
    }

    const token = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "10m" })

    resJson(res, 200, "Usuario encontrado.", { token })
  } catch (err) {
    if (err instanceof Error) {
      console.error("error in /authService: ", err)
      resJson(res, 500, err.message)
    } else {
      resJson(res, 500, "Erro desconhecido no servidor")
    }
  }
}

export { registerUser, loginUser }
